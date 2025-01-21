import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
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
  return await mkdtemp(tmpDir)
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
    await rm(tmpDir, { recursive: true, force: true })
    vi.restoreAllMocks()
  })

  const configurations = [
    {},
    { autoImports: false },
    { devtools: false },
  ] satisfies CloudstackPluginOptions[]

  it.each(configurations)('with options: %o', async (options) => {
    const plugins = await getActiveCloudstackVitePlugins(options)

    expect(plugins).toMatchSnapshot()
  })

  it('with all integrations', async () => {
    await mkdir(path.resolve(tmpDir, 'src/components'), { recursive: true })
    await writeFile(path.resolve(tmpDir, 'src/components/HelloWorld.vue'), `<template> <h1>Hello World</h1> </template>`)

    await mkdir(path.resolve(tmpDir, 'src/layouts'), { recursive: true })
    await writeFile(path.resolve(tmpDir, 'src/layouts/default.vue'), `<template> <slot /> </template>`)

    await mkdir(path.resolve(tmpDir, 'src/pages'), { recursive: true })
    await writeFile(path.resolve(tmpDir, 'src/pages/Index.vue'), `<template> <h1>Index</h1> </template>`)

    await writeFile(path.resolve(tmpDir, 'uno.config.ts'), `export default {}`)

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
    expect((module.resolveId as any)('virtual:cloudstack')).toEqual(`\0virtual:cloudstack`)
  })

  it('should generate virtual module content, with router', async () => {
    const module = virtualModule({ ...createContext(), found: feature => feature === 'pages' }) as any
    const content = await module.load(`\0virtual:cloudstack`)
    expect(content).toMatchSnapshot()
  })

  it('should generate virtual module content, without router & layouts', async () => {
    const module = virtualModule({ ...createContext(), found: feature => feature === 'pages' || feature === 'layouts' }) as any
    const content = await module.load(`\0virtual:cloudstack`)
    expect(content).toMatchSnapshot()
  })

  it('should generate virtual module content, with unocss', async () => {
    const module = virtualModule({ ...createContext(), found: feature => feature === 'uno.config' }) as any
    const content = await module.load(`\0virtual:cloudstack`)
    expect(content).toMatchSnapshot()
  })
})
