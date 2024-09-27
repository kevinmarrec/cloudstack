Bun.serve({
  fetch: () => {
    return new Response('Hello World')
  },
})
