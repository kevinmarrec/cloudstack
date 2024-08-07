import { defineConfig } from 'bumpp'

export default defineConfig({
  files: [
    'package.json',
    'packages/**/package.json',
    'playground/package.json',
  ],
})
