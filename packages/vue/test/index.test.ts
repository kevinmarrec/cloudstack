import { describe, expect, it } from 'vitest'

import { useFocus } from '../src'
import { OnClickOutside } from '../src/components'
import { useHead } from '../src/head'
import { useI18n } from '../src/i18n'
import { usePWA } from '../src/pwa'

describe('exports', async () => {
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
