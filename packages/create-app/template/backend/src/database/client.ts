import { drizzle } from 'drizzle-orm/node-postgres'

import { schema } from './schema'

if (import.meta.env.NODE_ENV !== 'development') {
  throw new Error('Database client is only available in development mode')
}

export const client = drizzle(import.meta.env.DATABASE_URL, { schema })
