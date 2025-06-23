import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: uuid().primaryKey(),
  name: text().notNull(),
  age: integer().notNull(),
  email: text().notNull().unique(),
})

export const schema = {
  usersTable,
}
