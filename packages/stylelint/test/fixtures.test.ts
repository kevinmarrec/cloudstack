import { join, resolve } from 'node:path'

import { execa } from 'execa'
import fs from 'fs-extra'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const inputDir = resolve('test/fixtures/input')
const outputDir = resolve('test/fixtures/output')
const testOutputDir = resolve('test/fixtures/_output')

beforeAll(async () => {
  await fs.rm(testOutputDir, { recursive: true, force: true })
})

afterAll(async () => {
  await fs.rm(testOutputDir, { recursive: true, force: true })
})

describe('fixtures', () => {
  it('vue.vue', async () => {
    const file = 'vue.vue'

    const inputFile = join(inputDir, file)
    const outputFile = join(outputDir, file)

    const testOutputFile = join(testOutputDir, file)
    const testConfigFile = join(testOutputDir, 'stylelint.config.js')

    await fs.copy(inputFile, testOutputFile)
    await fs.writeFile(testConfigFile, `
      import { defineConfig } from '@kevinmarrec/cloudstack-stylelint'
      export default defineConfig()
    `)

    await execa('bun', ['stylelint', file, '--fix'], {
      cwd: testOutputDir,
    })

    const testOutput = await fs.readFile(testOutputFile, 'utf-8')

    expect(testOutput).toMatchFileSnapshot(outputFile)
  })
})
