import { describe, expect, it } from 'vitest'

import { defineConfig } from '../src'

describe('unocss', () => {
  it('without unocss', async () => {
    const config = await defineConfig()

    expect(config).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'antfu/unocss',
        }),
      ]),
    )
  })

  it('with unocss', async () => {
    const config = await defineConfig({
      unocss: true,
    })

    expect(config).toEqual(
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
})
