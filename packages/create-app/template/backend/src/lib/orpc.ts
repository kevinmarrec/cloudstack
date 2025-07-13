import type { Database } from '@backend/database'
import type { Logger } from '@backend/logger'
import { os } from '@orpc/server'
import type { ResponseHeadersPluginContext } from '@orpc/server/plugins'

interface Context extends ResponseHeadersPluginContext {
  db: Database
  logger: Logger
  req: Request
}

export const pub = os.$context<Context>()
