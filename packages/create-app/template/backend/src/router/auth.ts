import { auth } from '@backend/lib/auth'
import { pub } from '@backend/lib/orpc'
import * as v from 'valibot'

export const getSession = pub.handler(async ({ context: { req, resHeaders, logger } }) => {
  const session = await auth.api.getSession({
    headers: req.headers,
    // returnHeaders: true,
  })

  // const sessionx: typeof auth.$Infer['Session'] | null = session

  // for (const cookie of headers.getSetCookie()) {
  //   resHeaders?.append('Set-Cookie', cookie)
  // }

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

    for (const [key, value] of headers.entries()) {
      resHeaders?.append(key, value)
    }
  })

export const signIn = pub.input(v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.string(),
}))
  .handler(async ({ input, context: { resHeaders, logger } }) => {
    const { headers } = await auth.api.signInEmail({
      body: {
        email: input.email,
        password: input.password,
      },
      returnHeaders: true,
    })

    logger.info(headers.count)

    for (const [key, value] of headers.entries()) {
      resHeaders?.append(key, value)
    }
  })

export const signOut = pub.handler(async ({ context: { req, resHeaders } }) => {
  const { headers } = await auth.api.signOut({
    headers: req.headers,
    returnHeaders: true,
  })

  for (const [key, value] of headers.entries()) {
    resHeaders?.append(key, value)
  }
})
