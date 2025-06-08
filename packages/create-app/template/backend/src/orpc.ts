import { os } from '@orpc/server'
import type { Logger } from 'pino'

export const pub = os.$context<{ logger: Logger }>()
