import { describe, expect, it } from 'vitest'

import { useHead, useI18n } from '../src'

describe('exports', async () => {
  it('@kevinmarrec/cloudstack-vue-i18n', () => {
    expect(useI18n).toBeDefined()
  })

  it('@unhead/vue', () => {
    expect(useHead).toBeDefined()
  })
})
