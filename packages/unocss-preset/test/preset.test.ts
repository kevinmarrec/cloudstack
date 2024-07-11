import { createGenerator } from '@unocss/core'
import { describe, expect, it } from 'vitest'

import preset from '../src'

describe('preset', () => {
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
