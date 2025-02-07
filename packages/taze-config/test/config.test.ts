import { describe, expect, it } from 'vitest'

import defaultConfig from '../src'

describe('config', async () => {
  it('should export default config', async () => {
    expect(defaultConfig).toMatchInlineSnapshot(`
      {
        "install": true,
        "interactive": true,
        "recursive": true,
        "write": true,
      }
    `)
  })
})
