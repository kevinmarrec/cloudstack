import { client } from '@backend/database/client'
import { usersTable } from '@backend/database/schema'
import { pub } from '@backend/lib/orpc'
import * as v from 'valibot'

export const welcome = pub
  .input(v.string())
  .output(v.string())
  .handler(async ({ input }) => {
    const result = await client.$count(usersTable)
    return `Hello ${input} (${result})!`
  })
