import fs from 'node:fs/promises'
import path from 'node:path'

import { ESLint } from 'eslint'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createTempDir } from '../../../test/utils'
import { useConfig } from '../src'

describe('config', async () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await createTempDir('eslint-config')
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir)
  })

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true })
    vi.restoreAllMocks()
  })

  it('should lint imports in typescript files', async () => {
    const eslint = new ESLint({
      fix: true,
      overrideConfigFile: true,
      overrideConfig: await useConfig(),
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
      fix: true,
      overrideConfigFile: true,
      overrideConfig: await useConfig(),
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
      overrideConfigFile: true,
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

  it('should load antfu/unocss lint rules, when uno.config.ts file is found', async () => {
    await fs.writeFile(path.resolve(tmpDir, 'uno.config.ts'), `export default {}`)

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

  it('should not load antfu/unocss lint rules, when uno.config.ts is not found', async () => {
    expect(await useConfig()).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'antfu/unocss',
        }),
      ]),
    )
  })
})
