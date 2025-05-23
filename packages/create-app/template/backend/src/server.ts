import { logger } from './logger'

const server = Bun.serve({
  fetch: () => {
    return new Response('Hello World')
  },
})

logger.info(`Listening on ${server.url}`)
