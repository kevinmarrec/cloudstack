import { access, cp, mkdir, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises'

import type { PathLike } from 'node:fs'

export async function exists(path: PathLike) {
  try {
    await access(path)
    return true
  }
  catch {
    return false
  }
}

export default {
  cp,
  exists,
  mkdir,
  readdir,
  readFile,
  rename,
  rm,
  writeFile,
}
