import * as v from 'valibot'

const schema = v.object({
  prettyPrint: v.optional(v.boolean(), false),
  level: v.optional(v.union([
    v.literal('trace'),
    v.literal('debug'),
    v.literal('info'),
    v.literal('warn'),
    v.literal('error'),
    v.literal('fatal'),
    v.literal('silent'),
  ]), 'info'),
})

export const logger = v.parse(schema, {
  prettyPrint: import.meta.env.NODE_ENV === 'development',
  level: import.meta.env.LOG_LEVEL,
})
