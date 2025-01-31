const server = Bun.serve({
  fetch: () => {
    return new Response('Hello World')
  },
})

// TODO: Remove this console.log by adding proper logger
// eslint-disable-next-line no-console
console.log(`Listening on ${server.url}`)
