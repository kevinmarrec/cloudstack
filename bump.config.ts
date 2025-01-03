import { defineConfig } from 'bumpp'

export default defineConfig({
  files: [
    'package.json',
    'packages/**/package.json',
    '!**/template/**',
  ],
  execute: 'bun install --ignore-scripts --silent && git add bun.lock ',
})
