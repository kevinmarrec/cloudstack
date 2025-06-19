import type { Router, RouterClient } from '@backend/router'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

const link = new RPCLink({
  url: 'http://localhost:3000/rpc',
})

const client: RouterClient<Router> = createORPCClient(link)

export const orpc = createTanstackQueryUtils(client)
