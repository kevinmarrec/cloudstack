import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

import { createServer, resolveConfig } from 'vite'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import CloudstackVitePlugin, { type CloudstackPluginOptions } from '../src'
import { createContext } from '../src/context'
import virtualModule from '../src/integrations/cloudstack/global'

async function createTempDir() {
  const osTmpDir = os.tmpdir()
  const tmpDir = path.resolve(osTmpDir, 'vite-plugin-test')
  return await fs.mkdtemp(tmpDir)
}

async function getActiveCloudstackVitePlugins(options?: CloudstackPluginOptions): Promise<string[]> {
  const baseConfig = await resolveConfig({}, 'serve')

  const resolvedConfig = await resolveConfig({ plugins: [CloudstackVitePlugin(options)] }, 'serve')

  const addedPlugins = resolvedConfig.plugins.filter(plugin => !baseConfig.plugins.some(basePlugin => basePlugin.name === plugin.name))
  return addedPlugins.map(plugin => plugin.name)
}

describe('plugin', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await createTempDir()
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir)
  })

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true })
    vi.restoreAllMocks()
  })

  const configurations = [
    {},
    { devtools: false },
  ] satisfies CloudstackPluginOptions[]

  it.each(configurations)('with options: %o', async (options) => {
    const plugins = await getActiveCloudstackVitePlugins(options)

    expect(plugins).toMatchSnapshot()
  })

  it('with all integrations', async () => {
    await fs.writeFile(path.resolve(tmpDir, 'uno.config.ts'), `export default {}`)

    const plugins = await getActiveCloudstackVitePlugins({
      pwa: {
        pwaAssets: {
          disabled: true,
        },
      },
    })

    expect(plugins).toMatchSnapshot()
  })

  it('should optimize dependency "workbox-window" with pwa option', async () => {
    const resolvedConfig = await resolveConfig({
      plugins: [
        CloudstackVitePlugin({
          pwa: {
            pwaAssets: {
              disabled: true,
            },
          },
        }),
      ],
    }, 'serve')

    expect(resolvedConfig.optimizeDeps.include).toEqual(
      expect.arrayContaining(['vite-ssg', 'workbox-window']),
    )
  })

  it('should inject dark mode script in index.html', async () => {
    const server = await createServer({ plugins: [CloudstackVitePlugin()] })

    const html = await server.transformIndexHtml('index.html', '<html></html>')

    expect(html).toMatchSnapshot()
  })
})

describe('virtual module', async () => {
  it('should resolve virtual module id', async () => {
    const module = virtualModule(createContext({})) as any
    expect((module.resolveId as any)('virtual:cloudstack')).toEqual('virtual:cloudstack')
  })

  it('should generate virtual module content (MPA)', async () => {
    const module = virtualModule({ ...createContext(), found: () => false }) as any
    const content = await module.load('virtual:cloudstack')
    expect(content).toMatchSnapshot()
  })

  it('should generate virtual module content, (MPA with unocss)', async () => {
    const module = virtualModule({ ...createContext(), found: file => file === 'uno.config.ts' }) as any
    const content = await module.load('virtual:cloudstack')
    expect(content).toMatchSnapshot()
  })

  it('should generate virtual module content, (SPA)', async () => {
    const module = virtualModule({ ...createContext(), found: () => false }) as any
    const content = await module.load('virtual:cloudstack/spa')
    expect(content).toMatchSnapshot()
  })
})
