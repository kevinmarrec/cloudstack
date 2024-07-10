import fs from 'node:fs/promises'
import path from 'node:path'

import stylelint, { type LinterOptions } from 'stylelint'
import { describe, expect, it } from 'vitest'

import { defineConfig } from '../src'

describe('fixtures', () => {
  it('vue.vue', async () => {
    const inputFile = path.resolve('fixtures/input/vue.vue')
    const outputFile = path.resolve('fixtures/output/vue.vue')

    const linterOptions: LinterOptions = {
      config: defineConfig(),
      customSyntax: 'postcss-html',
      code: await fs.readFile(inputFile, 'utf-8'),
    }

    const { results: [{ warnings }] } = await stylelint.lint(linterOptions)

    expect(warnings).toMatchObject([
      expect.objectContaining({
        text: 'Expected "display" to come before "margin" (order/properties-order)',
      }),
      expect.objectContaining({
        text: 'Unexpected duplicate "display" (declaration-block-no-duplicate-properties)',
      }),
      expect.objectContaining({
        text: 'Unexpected unit (length-zero-no-unit)',
      }),
    ])

    const { code: output } = await stylelint.lint({ ...linterOptions, fix: true })

    expect(output).toMatchFileSnapshot(outputFile)
  })
})
