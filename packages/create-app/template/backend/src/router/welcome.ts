import { client } from '@backend/database/client'
import { users } from '@backend/database/schema'
import { pub } from '@backend/lib/orpc'
import { eq } from 'drizzle-orm'
import * as v from 'valibot'

export const welcome = pub
  .input(v.string())
  .output(v.string())
  .handler(async ({ input }) => {
    const user = await client.query.users.findFirst({
      where: ({ id }, { eq }) => eq(id, 1),
    })
    return `Hello ${input} (${user?.createdAt} users online)!`
  })
