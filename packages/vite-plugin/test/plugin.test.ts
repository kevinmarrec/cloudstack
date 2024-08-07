import { mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

import { createServer, resolveConfig } from 'vite'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import CloudstackVitePlugin, { type CloudstackPluginOptions } from '../src'

describe('plugin', () => {
  const tmpDir = path.resolve(import.meta.dirname, 'tmp')
  const rmTmpDir = async () => await rm(tmpDir, { recursive: true, force: true })

  beforeEach(rmTmpDir)
  afterEach(rmTmpDir)

  it.each<CloudstackPluginOptions>([
    {}, // Default
  ])(`should resolve correct plugin options for config %o`, async (options) => {
    const pluginOptions = CloudstackVitePlugin(options)
      .flatMap(option => option)
      .filter(option => typeof option === 'object' && option !== null && 'name' in option)
      .map(option => option.name)
      .toSorted()

    expect(pluginOptions).toMatchSnapshot()
  })

  it('should optimize dependency "workbox-window" with pwa option', async () => {
    const resolvedConfig = await resolveConfig({
      root: tmpDir,
      plugins: [
        CloudstackVitePlugin({ pwa: true }),
      ],
    }, 'build')

    expect(resolvedConfig.optimizeDeps.include).toEqual(
      expect.arrayContaining(['workbox-window']),
    )
  })

  it('should resolve ~ alias based on root', async () => {
    const resolvedConfig = await resolveConfig({
      root: tmpDir,
      plugins: [
        CloudstackVitePlugin(),
      ],
    }, 'build')

    expect(resolvedConfig.resolve.alias).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          find: '~',
          replacement: `${tmpDir}/src`,
        }),
      ]),
    )
  })

  it('should inject dark mode script in index.html', async () => {
    await mkdir(tmpDir)

    const server = await createServer({
      root: tmpDir,
      plugins: [
        CloudstackVitePlugin(),
      ],
    })

    const html = await server.transformIndexHtml('index.html', '<html></html>')

    expect(html).toMatchSnapshot()
  })
})
