import process from 'node:process'

import { onError, ORPCError } from '@orpc/server'
import { RPCHandler } from '@orpc/server/fetch'
import { CORSPlugin, ResponseHeadersPlugin } from '@orpc/server/plugins'

import { auth } from './auth'
import { cors, hostname, port } from './config/server'
import { db } from './database'
import { logger } from './logger'
import { router } from './router'

// RPC

export const rpcHandler = new RPCHandler(router, {
  plugins: [
    new CORSPlugin(cors),
    new ResponseHeadersPlugin(),
  ],
  interceptors: [
    onError((error) => {
      if (error instanceof ORPCError) {
        return
      }

      logger.error(error)
    }),
  ],
})

// Server

const server = Bun.serve({
  hostname,
  port,
  async fetch(request) {
    const { matched, response } = await rpcHandler.handle(request, {
      prefix: '/rpc',
      context: {
        auth,
        db,
        logger,
        request,
      },
    })

    if (matched)
      return response

    return new Response('Not found', { status: 404 })
  },
  error(error) {
    logger.error(error)
    return new Response('Internal Server Error', { status: 500 })
  },
})

logger.info(`Listening on ${server.url}`)

// Graceful Shutdown

async function gracefulShutdown() {
  logger.info('Gracefully shutting down...')
  await server.stop()
  process.exit(0)
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
