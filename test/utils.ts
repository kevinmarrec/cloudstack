import fs from 'node:fs/promises'
import os from 'node:os'

import { resolve } from 'pathe'

export async function createTempDir(prefix: string) {
  const osTmpDir = os.tmpdir()
  const tmpDir = resolve(osTmpDir, `${prefix}-`)
  return await fs.mkdtemp(tmpDir)
}
