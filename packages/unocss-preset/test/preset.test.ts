import { rm } from 'node:fs/promises'
import path from 'node:path'

import { createGenerator } from '@unocss/core'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import preset from '../src'

describe('preset', () => {
  const tmpDir = path.resolve(import.meta.dirname, 'tmp')
  const rmTmpDir = async () => await rm(tmpDir, { recursive: true, force: true })

  beforeEach(rmTmpDir)
  afterEach(rmTmpDir)

  it('should generate correct css', async () => {
    const uno = createGenerator({
      presets: [preset()],
    })

    const { css } = await uno.generate([])

    expect(css).toMatchSnapshot()
  })

  it('should generate correct css with fonts options', async () => {
    const uno = createGenerator({
      presets: [
        preset({
          cwd: tmpDir,
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
    const uno = createGenerator({
      presets: [
        preset({
          icons: {
            scale: 2,
          },
        }),
      ],
    })

    const { css } = await uno.generate(['i-carbon-home'])

    expect(css).toMatchSnapshot()
  })
})
