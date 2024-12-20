import fs from 'node:fs/promises'
import path from 'node:path'

import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

import { useConfig } from '../src'

describe('fixtures', () => {
  it('typescript.ts', async () => {
    const inputFile = path.resolve(import.meta.dirname, 'fixtures/input/typescript.ts')
    const outputFile = path.resolve(import.meta.dirname, 'fixtures/output/typescript.ts')

    const code = await fs.readFile(inputFile, 'utf-8')

    const eslint = new ESLint({
      flags: ['unstable_ts_config'],
      overrideConfig: await useConfig(),
      fix: true,
    })

    const [{ output }] = await eslint.lintText(code, { filePath: 'typescript.ts' })

    await expect(output).toMatchFileSnapshot(outputFile)
  })

  it('vue.vue', async () => {
    const code = `
      <script setup lang="ts">
        defineProps<{ foo: string }>()
      </script>
    `

    const eslint = new ESLint({
      flags: ['unstable_ts_config'],
      overrideConfig: await useConfig(),
      fix: true,
    })

    const [{ errorCount, messages }] = await eslint.lintText(code, { filePath: 'vue.vue' })

    expect(errorCount).toBe(1)
    expect(messages.length).toBe(1)
    expect(messages[0].message).toContain('\'foo\' of property found, but never used')
  })
})
