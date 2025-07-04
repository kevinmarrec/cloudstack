import { logger } from '@backend/logger'
import { drizzle } from 'drizzle-orm/bun-sqlite'

import * as schema from './schema'

export const client = drizzle('./db.sqlite', {
  schema,
  logger: {
    logQuery: (query, params) => {
      logger.info(`[SQL] ${query} [${params}]`)
    },
  },
})
