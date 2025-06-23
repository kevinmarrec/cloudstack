import * as v from 'valibot'

const schema = v.object({
  url: v.string(),
})

export const credentials = v.parse(schema, {
  url: import.meta.env.DATABASE_URL,
})
