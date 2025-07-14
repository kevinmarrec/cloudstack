import type { Database } from '@backend/database'
import type { auth } from '@backend/lib/auth'
import type { Logger } from '@backend/logger'
import { os } from '@orpc/server'
import type { ResponseHeadersPluginContext } from '@orpc/server/plugins'

interface Context extends ResponseHeadersPluginContext {
  $auth: typeof auth
  db: Database
  logger: Logger
  req: Request
}

export const pub = os.$context<Context>()
