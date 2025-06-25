import { pgTable } from 'drizzle-orm/pg-core'

export const users = pgTable('users', t => ({
  id: t.uuid().primaryKey(),
  name: t.text().notNull(),
}))
