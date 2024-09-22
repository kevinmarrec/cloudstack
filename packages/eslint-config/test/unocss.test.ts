import { describe, expect, it, vi } from 'vitest'

import { useConfig } from '../src'

const mocks = vi.hoisted(() => ({
  isPackageExists: vi.fn(),
}))

vi.mock('local-pkg', () => ({
  isPackageExists: mocks.isPackageExists,
}))

describe('unocss', () => {
  it('with unocss if installed', async () => {
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

  it('without unocss if not installed', async () => {
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
