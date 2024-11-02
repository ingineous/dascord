import 'dotenv/config'

import express, { Express, NextFunction, Request, Response } from 'express'
import supabase from './supabase/supabase'
import { db } from './db/db'
import { MessagesTable, UserTable } from './db/schema'
import { and, arrayContains, eq, inArray, ne, notInArray } from 'drizzle-orm/sql/expressions/conditions'
import { generateUsername } from 'unique-username-generator'
import cors from 'cors'
import { nanoid } from 'nanoid'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { createClient } from 'redis'
import { desc } from 'drizzle-orm/sql/expressions/select'


const app: Express = express()

const EXPIRY_TIME = 3600

const redisClient = createClient()


try {
  // @ts-ignore
  await redisClient.connect()
} catch (error) {
  console.error(error)
}


const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.body

  try {
    const user = await supabase.auth.getUser(accessToken)

    res.locals.user = user

    res.locals.authenticated = !!user.data.user


    res.locals.registeredUser = null
    let registeredUser = null


    if (user.data.user) {
      try {
        const redisRegisteredUser = await redisClient.get(`user${user.data.user.id}`)

        if (redisRegisteredUser) {
          registeredUser = JSON.parse(redisRegisteredUser)
          console.log("redis register", registeredUser)
        }
      } catch (error) {
        console.error(error)
      }

      if (!registeredUser[0]) {
        registeredUser = await db.select().from(UserTable).where(eq(UserTable.authID, user.data.user.id))

        redisClient.setEx(`user${user.data.user.id}`, EXPIRY_TIME, JSON.stringify(registeredUser)).catch(err => console.error(err))
      }

      res.locals.registeredUser = registeredUser[0]
    }

    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}

app.use(cors())
app.use(express.urlencoded({ extended: true, limit: '200mb' }))
app.use(express.json({ limit: '200mb' }))
app.use(authMiddleware)

const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'sup bitches' })
})

app.post('/idk', async (req: Request, res: Response) => {
  res.json(res.locals)
})

const username = async () => {
  const name = generateUsername('-', 4)

  const user = await db.select({ name: UserTable.name }).from(UserTable).where(eq(UserTable.name, name))

  if (!user.length) return name

  return await username()
}

app.post('/register', async (req: Request, res: Response) => {
  const { user: authUser, authenticated, registeredUser } = res.locals

  if (!authenticated) {
    res.status(400).json({ error: 'not authenticated' })
    return
  }

  if (registeredUser) {
    res.status(200).json(registeredUser)
    return
  }

  try {
    const name = await username()

    const user = await db
      .insert(UserTable)
      .values({
        name: name,
        authID: authUser.data.user.id,
        bio: 'no thots head empty',
        friends: [authUser.data.user.id],
      })
      .returning({
        authID: UserTable.authID,
        name: UserTable.name,
        avatar: UserTable.avatar,
        bio: UserTable.bio,
        requestsSent: UserTable.requestsSent,
        requestsReceived: UserTable.requestsReceived,
        friends: UserTable.friends,
      })

    res.status(200).json(user)
  } catch (error) {
    console.error("reg error", error)
    res.status(500).json({ error })
  }
})


app.post('/friend-request', async (req: Request, res: Response) => {
  const { user, authenticated, registeredUser } = res.locals
  const { receiverID } = req.body

  if (!authenticated) {
    res.status(400).json({ error: 'not authenticated' })
    return
  }

  if (receiverID === user.data.user.id) {
    res.status(400).json({ error: 'cant friend yourself' })
    return
  }

  try {
    if (!registeredUser) {
      res.status(400).json({ error: 'not registered' })
      return
    }

    let receiver = []

    try {
      const redisReceiver = await redisClient.get(`user${receiverID}`)

      if (redisReceiver) receiver = JSON.parse(redisReceiver)
    } catch (error) {
      console.error(error)
    }

    if (!receiver.length) {
      receiver = await db.select().from(UserTable).where(eq(UserTable.authID, receiverID))
      redisClient.setEx(`user${receiverID}`, EXPIRY_TIME, JSON.stringify(receiver)).catch(err => console.log(err))

    }
    if (!receiver.length) {
      res.status(400).json({ error: 'no user as that' })
      return

    }

    if (registeredUser.requestsSent.includes(receiverID)) {
      res.status(400).json({ error: 'already sent request' })
      return
    }

    if (registeredUser.friends.includes(receiverID)) {
      res.status(400).json({ error: 'cant friend a friend' })
      return
    }

    if (registeredUser.requestsReceived.includes(receiverID)) {
      res.status(400).json({ error: 'already has a friend request' })
      return
    }

    const friendRequestSent = await db.update(UserTable)
      .set({ requestsSent: [...registeredUser.requestsSent, receiverID] })
      .where(eq(UserTable.authID, registeredUser.authID))
      .returning()

    redisClient
      .setEx(`user${registeredUser.authID}`, EXPIRY_TIME, JSON.stringify(friendRequestSent))
      .catch(err => console.log(err))

    const friendRequestReceived = await db.update(UserTable) // @ts-ignore
      .set({ requestsReceived: [...receiver[0].requestsReceived, registeredUser.authID] })
      .where(eq(UserTable.authID, receiverID))
      .returning()

    redisClient
      .setEx(`user${receiverID}`, EXPIRY_TIME, JSON.stringify(friendRequestReceived))
      .catch(err => console.log(err))


    res.status(200).json({ ...friendRequestSent[0] })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

app.post('/accept-request', async (req: Request, res: Response) => {
  const { user, authenticated, registeredUser } = res.locals
  const { initiatorID } = req.body

  console.log('acceptor', initiatorID)


  if (!registeredUser) {
    res.status(400).json({ error: 'not authenticated' })
    return
  }

  if (initiatorID === user.data.user.id) {
    res.status(400).json({ error: 'cant friend yourself' })
    return
  }

  try {
    let initiator = []

    try {
      const redisInitiator = await redisClient.get(`user${initiatorID}`)
      if (redisInitiator) initiator = JSON.parse(redisInitiator)
    } catch (err) {
      console.error(err)
    }

    if (!initiator[0]) {
      initiator = await db.select()
        .from(UserTable)
        .where(eq(UserTable.authID, initiatorID))

      redisClient
        .setEx(`user${initiatorID}`, EXPIRY_TIME, JSON.stringify(initiator))
        .catch(err => console.log(err))
    }

    if (!initiator[0]) {
      res.status(400).json({ error: 'no user as that' })
      return
    }

    if (!initiator[0].requestsSent?.includes(registeredUser.authID) || !registeredUser.requestsReceived.includes(initiatorID)) {
      res.status(400).json({ error: 'no such friend request' })
      return
    }

    const filteredRequestsSent = initiator[0].requestsSent?.filter((id: string) => {
      if (id !== registeredUser.authID) return id
      return
    })

    const filteredRequestsReceived = registeredUser.requestsReceived?.filter((id: string) => {
      if (id !== initiatorID) return id
      return
    })

    const friendInitiator = await db
      .update(UserTable)
      .set({
        requestsSent: filteredRequestsSent, // @ts-ignore
        friends: [...initiator[0]?.friends, registeredUser.authID],
      })
      .where(eq(UserTable.authID, initiatorID))
      .returning()

    redisClient
      .setEx(`user${initiatorID}`, EXPIRY_TIME, JSON.stringify(friendInitiator))
      .catch(err => console.log(err))



    const friendReceiver = await db
      .update(UserTable)
      .set({
        requestsReceived: filteredRequestsReceived,
        friends: [...registeredUser.friends, initiatorID],
      })
      .where(eq(UserTable.authID, registeredUser.authID))
      .returning()

    redisClient
      .setEx(`user${registeredUser.authID}`, EXPIRY_TIME, JSON.stringify(friendReceiver))
      .catch(err => console.log(err))

    res.status(200).json({ ...friendReceiver[0] })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

app.post('/send-msg', async (req: Request, res: Response) => {
  const { registeredUser } = res.locals
  const { receiverID, text, files } = req.body

  if (!registeredUser) {
    res.status(400).json({ error: 'not registered' })
    return
  }

  try {
    const receiver = await db.select()
      .from(UserTable)
      .where(eq(UserTable.authID, receiverID))

    const isFriends = receiver[0].friends?.includes(registeredUser.authID) && registeredUser.friends?.includes(receiverID)

    if (!isFriends) {
      res.status(400).json({ error: 'not friends' })
      return
    }


    const fileUrlList: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const urlFile = await fetch(file.url)
      const blobFile = await urlFile.blob()

      const path = `${registeredUser.authID}/${nanoid(10)}${file.name}`

      const { error } = await supabase.storage.from('dascord').upload(path, blobFile)

      if (error) {
        console.log(error)
        res.status(500).json({ error })
        return
      }

      const fileUrl = `https://odoxspibqhprcmjfckkl.supabase.co/storage/v1/object/public/dascord/${path}`

      fileUrlList.push(fileUrl)
    }


    const message = await db.insert(MessagesTable).values({
      dude: registeredUser.authID,
      dudette: receiverID,
      participants: [registeredUser.authID, receiverID],
      text: text,
      files: fileUrlList,
    }).returning({
      id: MessagesTable.id,
      dude: MessagesTable.dude,
      dudette: MessagesTable.dudette,
      text: MessagesTable.text,
      files: MessagesTable.files,
      time: MessagesTable.time,
    })


    const userSocketID = await redisClient.get(`socket${registeredUser.authID}`)
    const receiverSocketID = await redisClient.get(`socket${receiverID}`)

    console.log('recece', receiverID, receiverSocketID)

    io.to(userSocketID as string).emit('newmsg', {
      userID: receiverID,
      message: message[0],
    })

    if (registeredUser.authID !== receiverID) io.to(receiverSocketID as string)
      .emit('newmsg', {
        userID: registeredUser.authID,
        message: message[0],
      })
    res.status(200).json(message)
  } catch (error) {
    console.error(error)

    res.status(500).json({ error })
  }
})


app.post('/friends', async (req: Request, res: Response) => {
  const { registeredUser } = res.locals

  if (!registeredUser) {
    res.status(400).json({ error: 'not authenticated' })
    return
  }

  try {
    let friends = []

    try {
      const redisFriends = await redisClient.get(`friends${registeredUser.authID}`)

      if (redisFriends) {
        friends = JSON.parse(redisFriends)
      }
    }catch(error) {
      console.error(error)
    }

    if (!friends.length) {
      friends = await db.select()
        .from(UserTable)
        .where(and(inArray(UserTable.authID, registeredUser.friends), ne(UserTable.authID, registeredUser.authID)))

      redisClient
        .setEx(`friends${registeredUser.authID}`, EXPIRY_TIME, JSON.stringify(friends))
        .catch(err=> console.error(err))
    }


    res.status(200).json(friends)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})


app.post('/get-niggas', async (req: Request, res: Response) => {
  const { registeredUser } = res.locals

  if (!registeredUser) {
    res.status(400).json({ error: 'not registered' })
    return
  }

  try {
    
     let niggas = []
    
    try {
      const redisNiggas = await redisClient.get(`niggas${registeredUser.authID}`)

      if (redisNiggas) {
        niggas = JSON.parse(redisNiggas)
      }
    }catch (error) {
      console.error(error)
    }

    if (!niggas.length) {
      niggas = await db.select()
        .from(UserTable)
        .where(and(
          notInArray(UserTable.authID, registeredUser.friends),
          ne(UserTable.authID, registeredUser.authID),
        ))

      redisClient
        .setEx(`niggas${registeredUser.authID}`, 120, JSON.stringify(niggas))
        .catch(err=> console.error(err))
    }

    res.status(200).json(niggas)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

app.post('/get-request-niggas', async (req: Request, res: Response) => {
  const { registeredUser } = res.locals

  if (!registeredUser) {
    res.status(400).json({ error: 'not registered' })
    return
  }

  try {
    const niggas = await db.select()
      .from(UserTable)
      .where(inArray(UserTable.authID, registeredUser.requestsReceived))

    res.status(200).json({
      niggas,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

app.post('/chat', async (req: Request, res: Response) => {
  const { registeredUser } = res.locals
  const { dudette } = req.body

  if (!registeredUser) {
    res.status(400).json({ error: 'not registered' })
    return
  }

  try {
    const chat = await db.select()
      .from(MessagesTable)
      .orderBy(desc(MessagesTable.time))
      .where(arrayContains(
        MessagesTable.participants, [registeredUser.authID, dudette],
      ))

    res.status(200).json(chat)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

io.use(async function(socket: Socket, next) {
  if (socket.handshake.auth && socket.handshake.auth.accessToken) {
    try {
      const user = await supabase.auth.getUser(socket.handshake.auth.accessToken as string)

      // @ts-ignore
      socket.user = user.data.user

      if (user.data.user) // @ts-ignore
        socket.registeredUser = await db.select().from(UserTable).where(eq(UserTable.authID, user.data.user.id))


      next()
    } catch (error) {
      console.error(error)
      next(new Error('Authentication error'))
    }
  } else {
    next(new Error('Authentication error'))
  }
})
  .on('connection', async function(socket) {
    try {
      // @ts-ignore
      redisClient.set(`socket${socket.user.id}`, socket.id).then(() => console.log('setto rediso', `socket${socket.user.id}`, socket.id))

      socket.on('message', function(message) {
        io.emit('message', message)
      })

      socket.on('disconnect', function() { // @ts-ignore
        redisClient.del(`socket${socket.user.id}`).then(() => console.log('deleto rediso'))
      })
    } catch (error) {
      console.error(error)
    }
  })


// start the server
const port = process.env.PORT || 8080

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})
