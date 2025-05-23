import pino from 'pino'
import pretty from 'pino-pretty'

import { isDevelopment } from './env'

export const logger = pino({
  level: 'info',
  base: {},
}, isDevelopment ? pretty() : undefined)
