import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

import { useConfig } from '../src'

describe('ignores', () => {
  it('should ignore files, given "ignores" option', async () => {
    const eslint = new ESLint({
      overrideConfig: await useConfig({ ignores: ['**/*.foo'] }),
    })

    const [{ warningCount, messages }] = await eslint.lintText('', { filePath: 'file.foo' })

    expect(warningCount).toBe(1)
    expect(messages.length).toBe(1)
    expect(messages[0].message).toContain('File ignored because of a matching ignore pattern.')
  })
})
