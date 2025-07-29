import { os } from '@orpc/server'
import type { ResponseHeadersPluginContext } from '@orpc/server/plugins'

import type { Auth } from './auth'
import type { Database } from './database'
import type { Logger } from './logger'
import { requiredAuthMiddleware } from './middlewares/auth'

interface Context extends ResponseHeadersPluginContext {
  auth: Auth
  db: Database
  logger: Logger
  request: Request
}

export const pub = os.$context<Context>()

export const authed = pub.use(requiredAuthMiddleware)
