import stylelint from 'stylelint'
import { describe, expect, it } from 'vitest'

import { useConfig } from '../src'

describe('ignores', () => {
  it.each(['dist', 'node_modules'])('should ignore "%s" folder by default', async (folder) => {
    const { results: [{ ignored }] } = await stylelint.lint({
      config: useConfig(),
      codeFilename: `${folder}/foo.css`,
      code: '',
    })

    expect(ignored).toBe(true)
  })

  it('should ignore files, given "ignores" option', async () => {
    const { results: [{ ignored }] } = await stylelint.lint({
      config: useConfig({ ignoreFiles: ['**/*.foo'] }),
      codeFilename: 'file.foo',
      code: '',
    })

    expect(ignored).toBe(true)
  })
})
