import fs from 'node:fs/promises'

import { createGenerator } from '@unocss/core'
import { afterEach, describe, expect, it, onTestFinished, vi } from 'vitest'

import { createTempDir } from '../../../test/utils'
import preset from '../src'

describe('preset', () => {
  afterEach(async () => {
    vi.restoreAllMocks()
  })

  it('should generate correct css', async () => {
    const uno = await createGenerator({
      presets: [preset()],
    })

    const { css } = await uno.generate([])

    expect(css).toMatchSnapshot()
  })

  it('should generate correct css with fonts options', async () => {
    const tmpDir = await createTempDir('unocss-preset')
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir)
    onTestFinished(() => fs.rm(tmpDir, { recursive: true, force: true }))

    const uno = await createGenerator({
      presets: [
        preset({
          fonts: {
            sans: 'Inter',
          },
        }),
      ],
    })

    const { css } = await uno.generate(['font-sans'])

    expect(css).toMatchSnapshot()
  })

  it('should generate correct css with icons options', async () => {
    const uno = await createGenerator({
      presets: [
        preset({
          icons: {
            collections: {
              custom: {
                test: '<svg></svg>',
              },
            },
          },
        }),
      ],
    })

    const { css } = await uno.generate(['i-custom:test'])

    expect(css).toMatchSnapshot()
  })
})
