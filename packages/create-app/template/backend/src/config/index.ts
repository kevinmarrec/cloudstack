import { logger } from './logger'
import { server } from './server'

export { logger as loggerConfig }
export { server as serverConfig }

export const config = {
  logger,
  server,
}
