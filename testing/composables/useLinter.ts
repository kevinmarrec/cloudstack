import fs from 'node:fs/promises'
import path from 'node:path'

import { execa } from 'execa'
import { afterAll, beforeAll } from 'vitest'

export type Linter = 'eslint' | 'stylelint'

export function useLinter(linter: Linter) {
  const inputDir = path.resolve('test/fixtures/input')
  const outputDir = path.resolve('test/fixtures/_output')
  const snapshotDir = path.resolve('test/fixtures/output')

  beforeAll(async () => {
    await fs.rm(outputDir, { recursive: true, force: true })
  })

  afterAll(async () => {
    await fs.rm(outputDir, { recursive: true, force: true })
  })

  async function lint(file: string) {
    const inputFile = path.join(inputDir, file)
    const outputFile = path.join(outputDir, file)
    const configFile = path.join(outputDir, `${linter}.config.js`)

    await fs.cp(inputFile, outputFile)
    await fs.writeFile(configFile, `
      import { defineConfig } from '@kevinmarrec/cloudstack-${linter}-config'
      export default defineConfig()
    `)

    await execa('bun', [linter, file, '--fix'], {
      cwd: outputDir,
    })

    return {
      output: await fs.readFile(outputFile, 'utf-8'),
      snapshot: path.join(snapshotDir, file),
    }
  }

  return { lint }
}
