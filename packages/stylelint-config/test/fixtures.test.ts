import fs from 'node:fs/promises'
import path from 'node:path'

import { execa } from 'execa'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const inputDir = path.resolve('test/fixtures/input')
const outputDir = path.resolve('test/fixtures/output')
const testOutputDir = path.resolve('test/fixtures/_output')

beforeAll(async () => {
  await fs.rm(testOutputDir, { recursive: true, force: true })
})

afterAll(async () => {
  await fs.rm(testOutputDir, { recursive: true, force: true })
})

describe('fixtures', () => {
  it('vue.vue', async () => {
    const file = 'vue.vue'

    const inputFile = path.join(inputDir, file)
    const outputFile = path.join(outputDir, file)

    const testOutputFile = path.join(testOutputDir, file)
    const testConfigFile = path.join(testOutputDir, 'stylelint.config.js')

    await fs.cp(inputFile, testOutputFile)
    await fs.writeFile(testConfigFile, `
      import { defineConfig } from '@kevinmarrec/cloudstack-stylelint-config'
      export default defineConfig()
    `)

    await execa('bun', ['stylelint', file, '--fix'], {
      cwd: testOutputDir,
    })

    const testOutput = await fs.readFile(testOutputFile, 'utf-8')

    expect(testOutput).toMatchFileSnapshot(outputFile)
  })
})
