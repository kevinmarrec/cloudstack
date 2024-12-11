import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import prompts from 'prompts'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { run } from '../src/run'
import { exists } from '../src/utils/fs'

async function createTempDir() {
  const osTmpDir = os.tmpdir()
  const tmpDir = path.resolve(osTmpDir, 'create-app-test')
  return await mkdtemp(tmpDir)
}

describe('run', () => {
  let tmpDir: string
  const projectName = 'foo'

  beforeEach(async () => {
    process.argv = ['node', 'create-app']
    tmpDir = await createTempDir()
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir)
  })

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true })
  })

  it('create-app (no projectName, simulate projectName answer)', async () => {
    prompts.inject([projectName])

    await run()

    expect(await exists(path.join(tmpDir, projectName, 'package.json'))).toBe(true)
  })

  it('create-app [projectName] (target does not exist)', async () => {
    process.argv[2] = projectName

    await run()

    expect(await exists(path.join(tmpDir, projectName, 'package.json'))).toBe(true)
  })

  it('create-app [projectName] (target exists and is empty)', async () => {
    process.argv[2] = projectName

    await mkdir(path.join(tmpDir, projectName))

    await run()

    expect(await exists(path.join(tmpDir, projectName, 'package.json'))).toBe(true)
  })

  it('create-app [projectName] (target exists and only contains .git folder)', async () => {
    process.argv[2] = projectName

    await mkdir(path.join(tmpDir, projectName, '.git'), { recursive: true })

    await run()

    expect(await exists(path.join(tmpDir, projectName, '.git'))).toBe(true)
    expect(await exists(path.join(tmpDir, projectName, 'package.json'))).toBe(true)
  })

  it('create-app [projectName] (target exists and contains files, simulate shouldOverwrite answer: true)', async () => {
    process.argv[2] = projectName

    await mkdir(path.join(tmpDir, projectName, 'src'), { recursive: true })
    await writeFile(path.join(tmpDir, projectName, 'src', 'index.ts'), '')

    prompts.inject([true])

    await run()

    expect(await exists(path.join(tmpDir, projectName, 'package.json'))).toBe(true)
  })

  it('create-app [target] (target is current directory and contains files, simulate shouldOverwrite answer: false)', async () => {
    process.argv[2] = '.'

    vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`process.exit(${code})`)
    })

    await mkdir(path.join(tmpDir, 'src'), { recursive: true })
    await writeFile(path.join(tmpDir, 'src', 'index.ts'), '')

    prompts.inject([false])

    await expect(run()).rejects.toThrowError('process.exit(1)')

    expect(await exists(path.join(tmpDir, 'src'))).toBe(true)
    expect(await exists(path.join(tmpDir, 'package.json'))).toBe(false)
  })
})
