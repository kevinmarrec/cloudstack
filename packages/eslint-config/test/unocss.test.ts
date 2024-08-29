import { describe, expect, it, vi } from 'vitest'

import { defineConfig } from '../src'

const mocks = vi.hoisted(() => ({
  isPackageExists: vi.fn(),
}))

vi.mock('local-pkg', () => ({
  isPackageExists: mocks.isPackageExists,
}))

describe('unocss', () => {
  it('with unocss if installed', async () => {
    mocks.isPackageExists.mockReturnValue(true)

    expect(await defineConfig()).toEqual(
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

  it('without unocss if not installed', async () => {
    mocks.isPackageExists.mockReturnValue(false)

    expect(await defineConfig()).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'antfu/unocss',
        }),
      ]),
    )
  })
})
