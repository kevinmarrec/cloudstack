import stylelint from 'stylelint'
import { describe, expect, it } from 'vitest'

import { defineConfig } from '../src'

describe('ignores', () => {
  it('should ignore files, given "ignores" option', async () => {
    const { results: [{ ignored }] } = await stylelint.lint({
      config: defineConfig({ ignores: ['**/*.foo'] }),
      codeFilename: 'file.foo',
      code: '',
    })

    expect(ignored).toBe(true)
  })
})
