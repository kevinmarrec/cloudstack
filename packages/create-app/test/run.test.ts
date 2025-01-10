import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import prompts from 'prompts'
import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest'

import { run } from '../src/run'
import { exists } from '../src/utils/fs'

vi.mock('tinyexec', () => ({
  x: vi.fn(),
}))

async function createTempDir() {
  const osTmpDir = os.tmpdir()
  const tmpDir = path.resolve(osTmpDir, 'create-app-test')
  return await mkdtemp(tmpDir)
}

describe('run', () => {
  let tmpDir: string
  let consoleLogSpy: MockInstance
  let processExistSpy: MockInstance
  const projectName = 'foo'

  beforeEach(async () => {
    process.argv = ['node', 'create-app']
    tmpDir = await createTempDir()
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    processExistSpy = vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`process.exit(${code})`)
    })
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir)
  })

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true })
    vi.restoreAllMocks()
  })

  it('create-app (no directory given, simulate projectName answer)', async () => {
    prompts.inject([projectName])

    await run()

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Scaffolding project'))
    expect(await exists(path.join(tmpDir, projectName, 'package.json'))).toBe(true)
    expect(await exists(path.join(tmpDir, projectName, '.gitignore'))).toBe(true)
  })

  it('create-app [DIRECTORY] (directory does not exist)', async () => {
    process.argv[2] = projectName

    await run()

    expect(await exists(path.join(tmpDir, projectName, 'package.json'))).toBe(true)
  })

  it('create-app [DIRECTORY] (directory exists and is empty)', async () => {
    process.argv[2] = projectName

    await mkdir(path.join(tmpDir, projectName))

    await run()

    expect(await exists(path.join(tmpDir, projectName, 'package.json'))).toBe(true)
  })

  it('create-app [DIRECTORY] (directory exists and only contains .git folder)', async () => {
    process.argv[2] = projectName

    await mkdir(path.join(tmpDir, projectName, '.git'), { recursive: true })

    await run()

    expect(await exists(path.join(tmpDir, projectName, '.git'))).toBe(true)
    expect(await exists(path.join(tmpDir, projectName, 'package.json'))).toBe(true)
  })

  it('create-app [DIRECTORY] (directory exists and contains files, simulate shouldOverwrite answer: true)', async () => {
    process.argv[2] = projectName

    await mkdir(path.join(tmpDir, projectName, 'src'), { recursive: true })
    await writeFile(path.join(tmpDir, projectName, 'src', 'index.ts'), '')

    prompts.inject([true])

    await run()

    expect(await exists(path.join(tmpDir, projectName, 'package.json'))).toBe(true)
  })

  it('create-app [DIRECTORY] (directory is current directory and contains files, simulate shouldOverwrite answer: false)', async () => {
    process.argv[2] = '.'

    processExistSpy.mockImplementation((code) => {
      throw new Error(`process.exit(${code})`)
    })

    await mkdir(path.join(tmpDir, 'src'), { recursive: true })
    await writeFile(path.join(tmpDir, 'src', 'index.ts'), '')

    prompts.inject([false])

    await expect(run()).rejects.toThrowError('process.exit(1)')

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Operation cancelled'))

    expect(await exists(path.join(tmpDir, 'src'))).toBe(true)
    expect(await exists(path.join(tmpDir, 'package.json'))).toBe(false)
  })

  it('create-app --force [DIRECTORY] (directory exists and contains files)', async () => {
    process.argv[2] = projectName
    process.argv[3] = '--force'

    await mkdir(path.join(tmpDir, projectName, 'src'), { recursive: true })
    await writeFile(path.join(tmpDir, projectName, 'src', 'index.ts'), 'x')

    await run()

    expect(await exists(path.join(tmpDir, projectName, 'package.json'))).toBe(true)
  })

  it('create-app --install [DIRECTORY] (directory does not exist)', async () => {
    process.argv[2] = projectName
    process.argv[3] = '--install'

    await run()

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Installing dependencies'))
  })

  it('create-app --silent [DIRECTORY] (directory does not exist)', async () => {
    process.argv[2] = projectName
    process.argv[3] = '--silent'

    await run()

    expect(consoleLogSpy).not.toHaveBeenCalled()
  })

  it('create-app --help', async () => {
    process.argv[2] = '--help'

    await expect(run()).rejects.toThrowError('process.exit(0)')

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Usage: create-app'))
  })

  it('create-app --version', async () => {
    process.argv[2] = '--version'

    await expect(run()).rejects.toThrowError('process.exit(0)')

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringMatching(/create-app v\d+\.\d+\.\d+/))
  })
})
