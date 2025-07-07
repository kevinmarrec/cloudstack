import { logger } from '@backend/logger'
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'

import * as schema from './schema'

const db = new Database('./cloudstack.db')

db.exec('PRAGMA journal_mode = WAL')
db.exec('PRAGMA journal_size_limit = 6144000')
db.exec('PRAGMA synchronous = NORMAL')
db.exec('PRAGMA foreign_keys = ON')

export const client = drizzle(db, {
  schema,
  logger: {
    logQuery: (query, params) => {
      logger.info(`[SQL] ${query} [${params}]`)
    },
  },
})

export type DatabaseClient = typeof client
