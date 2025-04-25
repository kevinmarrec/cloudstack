import type { UserConfigExport } from 'vite'
import { describe, expect, it } from 'vitest'

import { useConfig } from '../src'

describe('config', async () => {
  it('default', async () => {
    expect(typeof useConfig()).toBe('function')
  })

  it.each<UserConfigExport>([
    { mode: 'foo' },
    () => ({ mode: 'foo' }),
  ])('with overrides: %o', async (overrides) => {
    const config = await useConfig(overrides)({ command: 'serve', mode: 'development' })
    expect(config.mode).toBe('foo')
  })
})
