function copyHeaders(source: Headers, destination: Headers) {
  for (const [key, value] of source.entries()) {
    destination?.append(key, value)
  }
}

export { copyHeaders }
