import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'

const client = postgres(process.env.DATABASE_URL as string, { prepare: false })

export const db = drizzle(client, { schema, logger: false })

client.listen("notification", (val) => console.log("notiffififfif",val))