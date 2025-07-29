import type { Auth } from '@backend/auth'
import { copyHeaders } from '@backend/utils/headers'
import { os } from '@orpc/server'
import type { ResponseHeadersPluginContext } from '@orpc/server/plugins'

export const requiredAuthMiddleware = os
  .$context<{ auth: Auth, request: Request } & ResponseHeadersPluginContext>()
  .errors({
    UNAUTHORIZED: { status: 401 },
  })
  .middleware(async ({ context, errors, next }) => {
    const response = await context.auth.api.getSession({
      headers: context.request.headers,
      asResponse: true,
    })

    const session = await response.json() as typeof context.auth.$Infer.Session

    copyHeaders(response.headers, context.resHeaders)

    if (!session) {
      throw errors.UNAUTHORIZED()
    }

    return next({
      context: {
        user: session.user,
      },
    })
  })
