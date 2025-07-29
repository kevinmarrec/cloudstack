import type { Auth } from '@backend/auth'
import { copyHeaders } from '@backend/utils/headers'
import { os } from '@orpc/server'

export const requiredAuthMiddleware = os
  .$context<{ auth: Auth, request: Request }>()
  .errors({
    UNAUTHORIZED: { status: 401 },
  })
  .middleware(async ({ context, errors, next }) => {
    const { headers, response: session } = await context.auth.api.getSession({
      headers: context.request.headers,
      returnHeaders: true,
    })

    copyHeaders(headers, context.resHeaders)

    if (!session) {
      throw errors.UNAUTHORIZED()
    }

    return next({
      context: {
        user: session.user,
      },
    })
  })
