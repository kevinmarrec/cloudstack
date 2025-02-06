import { describe, expect, it } from 'vitest'

import defaultConfig, { useConfig } from '../src'

describe('config', async () => {
  it('should export default config', async () => {
    expect(defaultConfig).toMatchInlineSnapshot(`
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

  it('should provide root workspace entry if not configured', async () => {
    expect(useConfig({
      workspaces: {
        foo: {
          entry: ['foo.ts'],
        },
      },
    })).toMatchInlineSnapshot(`
      {
        "stylelint": false,
        "workspaces": {
          ".": {
            "entry": [
              "*.config.ts",
            ],
          },
          "foo": {
            "entry": [
              "foo.ts",
            ],
          },
        },
      }
    `)
  })

  it('should override root workspace entry if configured', async () => {
    expect(useConfig({
      workspaces: {
        '.': {
          entry: ['bar.ts'],
        },
      },
    })).toMatchInlineSnapshot(`
      {
        "stylelint": false,
        "workspaces": {
          ".": {
            "entry": [
              "bar.ts",
            ],
          },
        },
      }
    `)
  })
})
