import { authed, pub } from '@backend/orpc'
import * as v from 'valibot'

export const getSession = authed.handler(async ({ context }) => {
  return context.user
})

export const signUp = pub
  .input(v.object({
    name: v.string(),
    email: v.pipe(v.string(), v.email()),
    password: v.string(),
  }))
  .handler(async ({ input, context: { resHeaders, auth } }) => {
    const { headers } = await auth.api.signUpEmail({
      body: input,
      returnHeaders: true,
    })

    headers.forEach((value, key) => resHeaders?.append(key, value))
  })

export const signIn = pub.input(v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.string(),
  rememberMe: v.optional(v.boolean(), true),
}))
  .handler(async ({ input, context: { request, resHeaders, auth } }) => {
    const { headers } = await auth.api.signInEmail({
      body: input,
      returnHeaders: true,
    })

    headers.forEach((value, key) => resHeaders?.append(key, value))
  })

export const signOut = pub.handler(async ({ context: { auth, request, resHeaders } }) => {
  const { headers } = await auth.api.signOut({
    headers: request.headers,
    returnHeaders: true,
  })

  headers.forEach((value, key) => resHeaders?.append(key, value))
})
