import { describe, expect, it, vi } from 'vitest'

import { useFocus } from '../src'
import { OnClickOutside } from '../src/components'
import { useHead } from '../src/head'
import { useI18n } from '../src/i18n'
import { usePWA } from '../src/pwa'

vi.mock('virtual:pwa-register', () => ({
  registerSW: vi.fn(),
}))

describe('exports', () => {
  it('@kevinmarrec/cloudstack-vue-i18n', () => {
    expect(useI18n).toBeDefined()
  })

  it('@kevinmarrec/cloudstack-vue-pwa', () => {
    expect(usePWA).toBeDefined()
  })

  it('@unhead/vue', () => {
    expect(useHead).toBeDefined()
  })

  it('@vueuse/components', () => {
    expect(OnClickOutside).toBeDefined()
  })

  it('@vueuse/core', () => {
    expect(useFocus).toBeDefined()
  })
})
