import pino from 'pino'

import { level, pretty } from './config/logger'

export const logger = pino({
  level,
  base: {},
  transport: pretty
    ? { target: 'pino-pretty' }
    : undefined,
})

export type Logger = typeof logger
