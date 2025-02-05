import fs from 'node:fs/promises'

import { glob } from 'tinyglobby'

const targetDirs = await glob(
  ['coverage', 'packages/*/dist'],
  { onlyDirectories: true, expandDirectories: false },
)

await Promise.all(targetDirs.map(async (dir) => {
  await fs.rm(dir, { recursive: true })
}))
