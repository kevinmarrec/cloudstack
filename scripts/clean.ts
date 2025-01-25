import fs from 'node:fs/promises'

import { glob } from 'tinyglobby'

const distDirs = await glob('packages/*/dist', { onlyDirectories: true })

await Promise.all(distDirs.map(async (distDir) => {
  await fs.rm(distDir, { recursive: true })
}))
