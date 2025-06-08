import * as v from 'valibot'

const schema = v.object({
  cors: v.object({
    origin: v.optional(
      v.pipe(
        v.string(),
        v.minLength(1),
        v.transform(value => value.split(',')),
      ),
      '*',
    ),
  }),
  host: v.optional(
    v.pipe(
      v.string(),
      v.minLength(1),
    ),
    '0.0.0.0',
  ),
  port: v.optional(v.pipe(
    v.string(),
    v.transform(value => +value),
    v.number(),
    v.minValue(3000),
    v.maxValue(65535),
  ), '3000'),
})

export const server = v.parse(schema, {
  cors: {
    origin: import.meta.env.ALLOWED_ORIGINS,
  },
  host: import.meta.env.HOST,
  port: import.meta.env.PORT,
})
