import { describe, expect, it } from 'vitest'

import { useLinter } from '../../../testing/composables/useLinter'

describe('fixtures', () => {
  const { lint } = useLinter('eslint')

  it('typescript.ts', async () => {
    const { output, snapshot } = await lint('typescript.ts')

    expect(output).toMatchFileSnapshot(snapshot)
  })
})
