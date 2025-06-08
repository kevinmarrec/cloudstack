import pino from 'pino'
import pretty from 'pino-pretty'

import { loggerConfig } from './config'

export const logger = pino({
  level: loggerConfig.level,
  base: {},
}, loggerConfig.prettyPrint ? pretty() : undefined)
