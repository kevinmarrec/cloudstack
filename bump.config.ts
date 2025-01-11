import { defineConfig } from 'bumpp'

export default defineConfig({
  all: true,
  execute: 'bun install --lockfile-only --silent',
  files: [
    'package.json',
    'packages/**/package.json',
    '!**/template/**',
  ],
})
