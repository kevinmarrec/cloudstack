import process from 'node:process'

import { onError } from '@orpc/server'
import { RPCHandler } from '@orpc/server/fetch'
import { CORSPlugin, ResponseHeadersPlugin } from '@orpc/server/plugins'

import { cors, hostname, port } from './config/server'
import { db } from './database'
import { auth } from './lib/auth'
import { logger } from './logger'
import { router } from './router'

const rpcHandler = new RPCHandler(router, {
  plugins: [
    new CORSPlugin(cors),
    new ResponseHeadersPlugin(),
  ],
  interceptors: [
    onError((error) => {
      logger.error(error)
    }),
  ],
})

const server = Bun.serve({
  hostname,
  port,
  async fetch(request) {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    logger.info(session)

    if (session) {
      await auth.api.revokeOtherSessions({
        headers: request.headers,
      })

      logger.info(`session: ${session.user.email}`)

      const sessions = await auth.api.listSessions({
        headers: request.headers,

      })

      logger.info(sessions)
    }

    const { matched, response } = await rpcHandler.handle(request, {
      prefix: '/rpc',
      context: {
        db,
        logger,
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

async function gracefulShutdown() {
  logger.info('Gracefully shutting down...')
  await server.stop()
  process.exit(0)
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
