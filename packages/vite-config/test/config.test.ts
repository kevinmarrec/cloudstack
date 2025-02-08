import { describe, expect, it } from 'vitest'

import { useConfig } from '../src'

describe('config', async () => {
  it('should export default config', async () => {
    const config = await useConfig()({ command: 'serve', mode: 'development' })
    const config2 = await useConfig(() => ({}))({ command: 'serve', mode: 'development' })
    expect(config).toBeDefined()
    expect(config2).toBeDefined()
  })
})
