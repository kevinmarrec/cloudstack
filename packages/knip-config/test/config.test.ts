import { describe, expect, it } from 'vitest'

import { useConfig } from '../src'

describe('config', async () => {
  it('has stylelint plugin disabled', async () => {
    expect(useConfig().stylelint).toBe(false)
  })
})
