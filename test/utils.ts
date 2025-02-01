import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

export async function createTempDir(prefix: string) {
  const osTmpDir = os.tmpdir()
  const tmpDir = path.resolve(osTmpDir, `${prefix}-`)
  return await fs.mkdtemp(tmpDir)
}
