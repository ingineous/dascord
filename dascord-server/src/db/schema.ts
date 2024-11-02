import {
  pgTable,
  varchar,
  boolean,
  uniqueIndex,
  timestamp,
  integer,
  index,
} from 'drizzle-orm/pg-core'

export const UserTable = pgTable(
  'users',
  {
    authID: varchar('authID').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    avatar: varchar('avatar').notNull().default('https://odoxspibqhprcmjfckkl.supabase.co/storage/v1/object/public/dascord/ruby.jpg'),
    bio: varchar('bio', { length: 255 }).notNull().default(''),
    requestsSent: varchar("requestsSent").notNull().array().default([]),
    requestsReceived: varchar("requestsReceived").notNull().array().default([]),
    friends: varchar('friends').notNull().array().default([]),
    privateProfile: boolean('privateProfile').default(false),
    privateFriends: boolean('privateFriends').default(false)
  },
  (table) => {
    return {
      nameIndex: uniqueIndex('nameIndex').on(table.name),
      authIDIndex: uniqueIndex('authIDIndex').on(table.authID)
    }
  }
)

export const MessagesTable = pgTable('messages', {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  dude: varchar('dude')
    .references(() => UserTable.authID)
    .notNull(),
  dudette: varchar('dudette')
    .references(() => UserTable.authID)
    .notNull(),
  participants: varchar("participants").array().notNull(),
  text: varchar('text').notNull().default(''),
  files: varchar("files").array(),
  time: timestamp('time').defaultNow().notNull()
}, table => {
  return {
    dudeIndex: index("dudeIndex").on(table.dude),
    dudetteIndex: index("dudetteIndex").on(table.dudette)
  }
})
