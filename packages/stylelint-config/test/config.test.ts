import stylelint from 'stylelint'
import { describe, expect, it } from 'vitest'

import { useConfig } from '../src'

describe('config', () => {
  it('should lint css in .vue files', async () => {
    const code = `
      <style lang="scss" scoped>
      .foo {
        margin: 0px;
        display: block;
        display: block;
      }
      </style>
    `

    const { code: output } = await stylelint.lint({
      config: useConfig(),
      customSyntax: 'postcss-html',
      code,
      fix: true,
    })

    await expect(output).toMatchInlineSnapshot(`
      "
            <style lang="scss" scoped>
            .foo {
              display: block;
              margin: 0;
            }
            </style>
          "
    `)
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
