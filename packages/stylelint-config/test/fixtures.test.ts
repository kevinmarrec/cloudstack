import { describe, expect, it } from 'vitest'

import { useLinter } from '../../../testing/composables/useLinter'

describe('fixtures', () => {
  const { lint } = useLinter('stylelint')

  it('vue.vue', async () => {
    const { output, snapshot } = await lint('vue.vue')

    expect(output).toMatchFileSnapshot(snapshot)
  })
})
