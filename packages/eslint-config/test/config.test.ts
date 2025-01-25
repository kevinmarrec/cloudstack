import { ESLint } from 'eslint'
import { describe, expect, it, vi } from 'vitest'

import { useConfig } from '../src'

const mocks = vi.hoisted(() => ({
  isPackageExists: vi.fn(),
}))

vi.mock('local-pkg', () => ({
  isPackageExists: mocks.isPackageExists,
}))

describe('config', async () => {
  it('should lint imports in typescript files', async () => {
    const eslint = new ESLint({
      overrideConfig: await useConfig(),
      fix: true,
    })

    const code = `
      import { C, c, B, b, A, a  } from '~/alphabet'
      import { Foo } from 'Foo'
      import { baz } from 'Bar'
      import type { Bar } from 'Bar'
      import assert from 'node:assert'

      assert({
        A,
        B,
        C,
        a,
        b,
        c,
        foo: {} as Foo,
        bar: {} as Bar,
        baz,
      })
    `

    const [{ output }] = await eslint.lintText(code, { filePath: 'typescript.ts' })

    await expect(output).toMatchInlineSnapshot(`
      "import assert from 'node:assert'

      import { type Bar, baz } from 'Bar'

      import type { Foo } from 'Foo'

      import { A, a, B, b, C, c } from '~/alphabet'

      assert({
        A,
        B,
        C,
        a,
        b,
        c,
        foo: {} as Foo,
        bar: {} as Bar,
        baz,
      })
      "
    `)
  })

  it('should report issue when finding unused prop in .vue files', async () => {
    const eslint = new ESLint({
      overrideConfig: await useConfig(),
      fix: true,
    })

    const code = `
      <script setup lang="ts">
        defineProps<{ foo: string }>()
      </script>
    `

    const [{ errorCount, messages }] = await eslint.lintText(code, { filePath: 'vue.vue' })

    expect(errorCount).toBe(1)
    expect(messages.length).toBe(1)
    expect(messages[0].message).toMatchInlineSnapshot(`"'foo' of property found, but never used."`)
  })

  it('should ignore files, given "ignores" option', async () => {
    const eslint = new ESLint({
      overrideConfig: await useConfig({ ignores: ['**/*.foo'] }),
    })

    const [{ warningCount, messages }] = await eslint.lintText('', { filePath: 'file.foo' })

    expect(warningCount).toBe(1)
    expect(messages).toMatchInlineSnapshot(`
      [
        {
          "fatal": false,
          "message": "File ignored because of a matching ignore pattern. Use "--no-ignore" to disable file ignore settings or use "--no-warn-ignored" to suppress this warning.",
          "nodeType": null,
          "ruleId": null,
          "severity": 1,
        },
      ]
    `)
  })

  it('should load antfu/unocss lint rules, when unocss is installed', async () => {
    mocks.isPackageExists.mockReturnValue(true)

    expect(await useConfig()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'antfu/unocss',
          rules: expect.objectContaining({
            'unocss/order': 'warn',
            'unocss/blocklist': 'error',
          }),
        }),
      ]),
    )
  })

  it('should not load antfu/unocss lint rules, when unocss is not installed', async () => {
    mocks.isPackageExists.mockReturnValue(false)

    expect(await useConfig()).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'antfu/unocss',
        }),
      ]),
    )
  })
})
