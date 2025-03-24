import { describe, expect, it } from 'vitest'

import { useFocus } from '../src'
import { OnClickOutside } from '../src/components'
import { useHead } from '../src/head'
import { useI18n } from '../src/i18n'

describe('exports', async () => {
  it('@kevinmarrec/cloudstack-vue-i18n', () => {
    expect(useI18n).toBeDefined()
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
