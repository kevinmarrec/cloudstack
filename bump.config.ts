import { defineConfig } from 'bumpp'

export default defineConfig({
  all: true,
  execute: 'bun install --ignore-scripts --silent',
  files: [
    'package.json',
    'packages/**/package.json',
    '!**/template/**',
  ],
})
