import { mkdtemp, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { run } from '../src/run'

async function createTempDir() {
  const osTmpDir = os.tmpdir()
  const tmpDir = path.resolve(osTmpDir, 'create-app-test')
  return await mkdtemp(tmpDir)
}

describe('run', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await createTempDir()
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir)
  })

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true })
  })

  it('simple run', async ({ task }) => {
    process.argv = ['_', '_', task.id]

    await run()

    expect(true).toBe(true)
  })
})
