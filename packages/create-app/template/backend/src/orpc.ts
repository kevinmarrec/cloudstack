import { os } from '@orpc/server'

import type { Auth } from './auth'
import type { Database } from './database'
import type { Logger } from './logger'
import { requiredAuthMiddleware } from './middlewares/auth'

export interface Context {
  auth: Auth
  db: Database
  logger: Logger
  request: Request
}

export const pub = os.$context<Context>()

export const authed = pub.use(requiredAuthMiddleware)
