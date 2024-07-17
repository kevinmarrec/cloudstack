import { createServer, resolveConfig } from 'vite'
import { describe, expect, it } from 'vitest'

import CloudstackVitePlugin, { type VitePluginConfig } from '../src'

describe('plugin', () => {
  it.each<VitePluginConfig>([
    {},
    { autoImports: true },
    { components: true },
    { devtools: true },
    { layouts: true },
    { pwa: true },
    { router: true },
    { unocss: true },
    { autoImports: true, components: true, devtools: true, layouts: true, pwa: true, router: true, unocss: true },
  ])(`should resolve correct plugin options for config %o`, async (config) => {
    const pluginOptions = CloudstackVitePlugin(config)
      .flatMap(option => option)
      .filter(option => typeof option === 'object' && option !== null && 'name' in option)
      .map(option => option.name)
      .toSorted()

    expect(pluginOptions).toMatchSnapshot()
  })

  it('should resolve ~ alias based on root', async () => {
    const resolvedConfig = await resolveConfig({
      root: '/path/to/project',
      plugins: [
        CloudstackVitePlugin(),
      ],
    }, 'build')

    expect(resolvedConfig.resolve.alias).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          find: '~',
          replacement: '/path/to/project/src',
        }),
      ]),
    )
  })

  it('should inject dark mode script in index.html', async () => {
    const server = await createServer({
      plugins: [
        CloudstackVitePlugin(),
      ],
    })

    const html = await server.transformIndexHtml('index.html', '<html></html>')

    expect(html).toMatchSnapshot()
  })
})
