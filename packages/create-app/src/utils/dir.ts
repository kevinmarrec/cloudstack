import fs from 'node:fs/promises'
import path from 'node:path'

export async function canSkipEmptying(dir: string) {
  if (!await fs.exists(dir)) {
    return true
  }

  const files = await fs.readdir(dir)

  if (files.length === 0) {
    return true
  }
  if (files.length === 1 && files[0] === '.git') {
    return true
  }

  return false
}

export async function emptyDir(dir: string) {
  if (!await fs.exists(dir)) {
    return
  }

  for (const entry of await fs.readdir(dir)) {
    if (entry === '.git') {
      continue
    }

    await fs.rm(path.resolve(dir, entry), { recursive: true })
  }
}
