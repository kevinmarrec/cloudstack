import { RPCHandler } from '@orpc/server/fetch'
import { CORSPlugin } from '@orpc/server/plugins'

import { cors, hostname, port } from './config/server'
import { logger } from './logger'
import { router } from './router'

const rpcHandler = new RPCHandler(router, {
  plugins: [new CORSPlugin(cors)],
})

const server = Bun.serve({
  hostname,
  port,
  async fetch(request) {
    const { matched, response } = await rpcHandler.handle(request, {
      prefix: '/rpc',
      context: {
        logger,
      },
    })

    if (matched)
      return response

    return new Response('Not found', { status: 404 })
  },
})

logger.info(`Listening on ${server.url}`)
