import { auth } from '@backend/lib/auth'
import { pub } from '@backend/lib/orpc'

export const signUp = pub.handler(async ({ context: { resHeaders } }) => {
  const { headers } = await auth.api.signInEmail({
    body: {
      email: 'test@test.com',
      password: 'password1234',
    },
    returnHeaders: true,
  })

  resHeaders?.set('Set-Cookie', headers.get('Set-Cookie')!)
})
