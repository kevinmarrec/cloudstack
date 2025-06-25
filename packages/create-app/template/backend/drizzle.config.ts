import { Readable, Writable } from 'node:stream'
import zlib from 'node:zlib'

import { defineConfig } from 'drizzle-kit'

import { casing, url } from './src/config/database'

const transformMap = {
  'deflate': zlib.createDeflate,
  'deflate-raw': zlib.createDeflateRaw,
  'gzip': zlib.createGzip,
}

// https://github.com/oven-sh/bun/issues/1723
globalThis.CompressionStream = class CompressionStream {
  readable: ReadableStream
  writable: WritableStream

  constructor(format: keyof typeof transformMap) {
    const handle = transformMap[format]()
    this.readable = Readable.toWeb(handle)
    this.writable = Writable.toWeb(handle)
  }
}

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dialect: 'postgresql',
  casing,
  dbCredentials: {
    url,
  },
})
