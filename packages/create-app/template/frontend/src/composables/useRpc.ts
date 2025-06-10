import type { Router, RouterClient } from '@backend/router'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { useQuery } from '@tanstack/vue-query'
import { computed, type MaybeRef, unref } from 'vue'

const link = new RPCLink({
  url: 'http://localhost:3000/rpc',
})

const client: RouterClient<Router> = createORPCClient(link)

const orpc = createTanstackQueryUtils(client)

function useWelcome(text: MaybeRef<string>) {
  return useQuery(computed(() => orpc.welcome.queryOptions({
    input: unref(text),
  })))
}

export function useRPC() {
  return {
    rpc: client,
    useWelcome,
  }
}
