import { access, cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'

import type { PathLike } from 'node:fs'

async function exists(path: PathLike) {
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
  rm,
  writeFile,
}
