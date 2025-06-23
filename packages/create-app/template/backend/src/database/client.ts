import { PGlite } from '@electric-sql/pglite'
import { drizzle } from 'drizzle-orm/pglite'

import { url as dataDir } from '../config/database'
import { schema } from './schema'

if (import.meta.env.NODE_ENV !== 'development') {
  throw new Error('Database client is only available in development mode')
}

export const db = new PGlite(dataDir)

export const client = drizzle(db, { schema })
