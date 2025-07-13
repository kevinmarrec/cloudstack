import { auth } from '@backend/lib/auth'
import { pub } from '@backend/lib/orpc'
import * as v from 'valibot'

export const getSession = pub.handler(async ({ context: { req } }) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  })

  return session
})

export const signUp = pub
  .input(v.object({
    name: v.string(),
    email: v.pipe(v.string(), v.email()),
    password: v.string(),
  }))
  .handler(async ({ input, context: { resHeaders } }) => {
    const { headers } = await auth.api.signUpEmail({
      body: {
        email: input.email,
        password: input.password,
        name: input.name,
      },
      returnHeaders: true,
    })

    resHeaders?.set('Set-Cookie', headers.get('Set-Cookie')!)
  })

export const signIn = pub.input(v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.string(),
}))
  .handler(async ({ input, context: { resHeaders } }) => {
    const { headers } = await auth.api.signInEmail({
      body: {
        email: input.email,
        password: input.password,
      },
      returnHeaders: true,
    })

    resHeaders?.set('Set-Cookie', headers.get('Set-Cookie')!)
  })

export const signOut = pub.handler(async ({ context: { req } }) => {
  await auth.api.signOut({
    headers: req.headers,
  })
})
