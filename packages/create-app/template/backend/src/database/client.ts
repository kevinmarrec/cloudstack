import { casing, url } from '@backend/config/database'
import { drizzle } from 'drizzle-orm/bun-sql'

import * as schema from './schema'

export const client = drizzle(url, {
  schema,
  casing,
})
