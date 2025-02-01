import fs from 'node:fs/promises'

import { defineConfig } from 'bumpp'

async function bumpLockfile(newVersion: string) {
  const lockFile = await fs.readFile('bun.lock', 'utf-8')
  await fs.writeFile('bun.lock', lockFile.replace(
    /"version": "(.*?)"/g,
    `"version": "${newVersion}"`,
  ))
}

export default defineConfig({
  all: true,
  files: [
    'package.json',
    'packages/**/package.json',
    '!**/template/**',
  ],
  execute: ({ state: { newVersion } }) => bumpLockfile(newVersion),
})
