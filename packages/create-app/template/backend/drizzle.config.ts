import { Readable, Writable } from 'node:stream'
import type { ReadableStream, WritableStream } from 'node:stream/web'
import zlib from 'node:zlib'

import { defineConfig } from 'drizzle-kit'

const transformMap = {
  'deflate': zlib.createDeflate,
  'deflate-raw': zlib.createDeflateRaw,
  'gzip': zlib.createGzip,
}

// https://github.com/oven-sh/bun/issues/1723
globalThis.CompressionStream ??= class CompressionStream {
  readable: ReadableStream
  writable: WritableStream

  constructor(format: keyof typeof transformMap) {
    const handle = transformMap[format]()
    this.readable = Readable.toWeb(handle)
    this.writable = Writable.toWeb(handle)
  }
} as unknown as typeof CompressionStream

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: './db.sqlite',
  },
})
