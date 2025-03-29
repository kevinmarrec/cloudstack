import { describe, expect, it, vi } from 'vitest'

import { usePWA } from '../src'

vi.mock('virtual:pwa-register', () => ({
  registerSW: vi.fn(),
}))

describe('composable', () => {
  it('should be defined', () => {
    expect(usePWA).toBeDefined()
  })
})
