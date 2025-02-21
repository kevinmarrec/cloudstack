import type { PathLike } from 'node:fs'
import fs from 'node:fs/promises'

import { resolve } from 'pathe'

const ignorePredicate = (filename: string) => ['.git'].includes(filename)

async function empty(dir: string) {
  for (const entry of await fs.readdir(dir)) {
    if (ignorePredicate(entry)) {
      continue
    }

    await fs.rm(resolve(dir, entry), { recursive: true })
  }
}

async function emptyCheck(path: PathLike) {
  return fs.readdir(path)
    .then(files => files.every(ignorePredicate))
    .catch(() => true)
}

export async function exists(path: PathLike) {
  return fs.access(path)
    .then(() => true)
    .catch(() => false)
}

export default {
  ...fs,
  empty,
  emptyCheck,
  exists,
}
