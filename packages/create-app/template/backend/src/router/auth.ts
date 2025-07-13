import { setTimeout } from 'node:timers/promises'

import { auth } from '@backend/lib/auth'
import { pub } from '@backend/lib/orpc'

export const signUp = pub.handler(async () => {
  await setTimeout(2000)

  const { user, token } = await auth.api.signUpEmail({
    body: {
      email: 'tesxt@test.com',
      name: 'John Doe',
      password: 'password1234',
    },
  })

  return {
    user,
    token,
  }
})
