import type { Casing } from 'drizzle-orm'
import * as v from 'valibot'

const schema = v.object({
  url: v.string(),
})

const config = v.parse(schema, {
  url: import.meta.env.DATABASE_URL,
})

export const casing: Casing = 'snake_case'
export const url = config.url
