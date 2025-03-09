import { describe, expect, it, vi } from 'vitest'

import { createI18n } from '../src'

describe('plugin', () => {
  it('should works with SSR', async () => {
    vi.stubEnv('SSR', true)
    const plugin = await createI18n({})
    expect (plugin).toBeInstanceOf(Function)
  })
})
