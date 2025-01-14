import fs from 'node:fs/promises'

import { defineConfig } from 'bumpp'

export default defineConfig({
  all: true,
  execute: async ({ state: { newVersion } }) => {
    const lockFile = await fs.readFile('bun.lock', 'utf8')
    await fs.writeFile('bun.lock', lockFile.replace(
      /"version": "(.*?)"/g,
      `"version": "${newVersion}"`,
    ))
  },
  files: [
    'package.json',
    'packages/**/package.json',
    '!**/template/**',
  ],
})
