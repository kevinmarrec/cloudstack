import { mkdtemp, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { createServer, resolveConfig } from 'vite'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import CloudstackVitePlugin, { type CloudstackPluginOptions } from '../src'

async function createTempDir() {
  const osTmpDir = os.tmpdir()
  const tmpDir = path.resolve(osTmpDir, 'vite-plugin-test')
  return await mkdtemp(tmpDir)
}

vi.mock('local-pkg', () => ({
  isPackageExists: vi.fn(),
}))

describe('plugin', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await createTempDir()
  })

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true })
  })

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
        CloudstackVitePlugin({
          pwa: {
            pwaAssets: {
              disabled: true,
            },
          },
        }),
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
