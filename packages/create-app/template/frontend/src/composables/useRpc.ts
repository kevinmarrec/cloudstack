import type { Router, RouterClient } from '@backend/router'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'

const link = new RPCLink({
  url: 'http://localhost:3000/rpc',
})

const client: RouterClient<Router> = createORPCClient(link)

export function useRPC() {
  return {
    rpc: client,
  }
}
