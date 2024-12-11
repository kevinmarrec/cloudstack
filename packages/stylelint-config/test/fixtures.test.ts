import fs from 'node:fs/promises'
import path from 'node:path'

import stylelint from 'stylelint'
import { describe, expect, it } from 'vitest'

import { useConfig } from '../src'

describe('fixtures', () => {
  it('vue.vue', async () => {
    const inputFile = path.resolve(import.meta.dirname, 'fixtures/input/vue.vue')
    const outputFile = path.resolve(import.meta.dirname, 'fixtures/output/vue.vue')

    const code = await fs.readFile(inputFile, 'utf-8')

    const { code: output } = await stylelint.lint({
      config: useConfig(),
      customSyntax: 'postcss-html',
      code,
      fix: true,
    })

    await expect(output).toMatchFileSnapshot(outputFile)
  })
})
