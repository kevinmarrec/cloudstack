import * as v from 'valibot'

import { pub } from '../lib/orpc'

export const welcome = pub
  .input(v.string())
  .output(v.string())
  .handler(({ input }) => {
    return `Hello ${input}!`
  })
