import { describe, expect, it } from 'vitest'

import config from '../src'

describe('config', async () => {
  it('should export default config', async () => {
    expect(config).toMatchInlineSnapshot(`
      {
        "stylelint": false,
        "workspaces": {
          ".": {
            "entry": [
              "*.config.ts",
            ],
          },
        },
      }
    `)
  })
})
