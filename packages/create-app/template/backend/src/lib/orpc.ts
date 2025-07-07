import type { DatabaseClient } from '@backend/database/client'
import type { Logger } from '@backend/logger'
import { os } from '@orpc/server'

interface Context {
  db: DatabaseClient
  logger: Logger
}

export const pub = os
  .$context<Context>()
  .use(async ({ context, next, path }) => {
    context.logger.info(path.join('.'))
    return next()
  })
