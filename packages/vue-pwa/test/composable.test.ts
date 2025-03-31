import { beforeEach, describe, expect, it, vi } from 'vitest'

import { usePWA } from '../src'

const mocks = vi.hoisted(() => ({
  registerSW: vi.fn(),
}))

vi.mock('virtual:pwa-register', () => ({
  registerSW: mocks.registerSW,
}))

beforeEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

describe('composable', () => {
  it('should register service worker in browser', async () => {
    vi.stubEnv('SSR', false)
    usePWA().register()
    expect(mocks.registerSW).toHaveBeenCalled()
  })

  it('should not register service worker with SSR', () => {
    vi.stubEnv('SSR', true)
    usePWA().register()
    expect(mocks.registerSW).not.toHaveBeenCalled()
  })
})
