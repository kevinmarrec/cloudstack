import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import { type ConfigEnv, createServer, resolveConfig } from 'vite'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createTempDir } from '../../../test/utils'
import CloudstackVitePlugin, { type CloudstackPluginOptions } from '../src'
import { createContext } from '../src/context'
import virtualModule from '../src/integrations/cloudstack/global'

async function getActiveCloudstackVitePlugins(options: CloudstackPluginOptions = {}, env?: ConfigEnv): Promise<string[]> {
  const baseConfig = await resolveConfig({}, 'serve')

  const resolvedConfig = await resolveConfig({ plugins: [CloudstackVitePlugin(options, env)] }, 'serve')

  const addedPlugins = resolvedConfig.plugins.filter(plugin => !baseConfig.plugins.some(basePlugin => basePlugin.name === plugin.name))
  return addedPlugins.map(plugin => plugin.name)
}

describe('plugin', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await createTempDir('vite-plugin')
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir)
  })

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true })
    vi.restoreAllMocks()
  })

  it('with defaults', async () => {
    expect(await getActiveCloudstackVitePlugins()).toMatchSnapshot()
  })

  it('with all integrations', async () => {
    await fs.writeFile(path.resolve(tmpDir, 'uno.config.ts'), `export default {}`)

    await fs.mkdir(path.resolve(tmpDir, 'src/pages'), { recursive: true })
    await fs.writeFile(path.resolve(tmpDir, 'src/pages/index.vue'), `<template></template>`)

    const plugins = await getActiveCloudstackVitePlugins({
      pwa: {
        pwaAssets: {
          disabled: true,
        },
      },
    }, { command: 'build', mode: 'analyze' })

    expect(plugins).toMatchSnapshot()
  })

  it('should drop module preload polyfill', async () => {
    const resolvedConfig = await resolveConfig({ plugins: [CloudstackVitePlugin()] }, 'serve')
    expect(resolvedConfig.build.modulePreload).toEqual({ polyfill: false })
  })

  it('should optimize dependencies', async () => {
    const resolvedConfig = await resolveConfig({ plugins: [CloudstackVitePlugin()] }, 'serve')
    expect(resolvedConfig.optimizeDeps.include).toEqual([
      'vite-ssg',
      'vite-ssg/single-page',
      'vue',
    ])
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

  it('should generate virtual module content (MPA with unocss)', async () => {
    const module = virtualModule({ ...createContext(), found: feature => feature === 'routes' || feature === 'uno.config.ts' }) as any
    const content = await module.load('virtual:cloudstack')
    expect(content).toMatchSnapshot()
  })

  it('should generate virtual module content, (SPA)', async () => {
    const module = virtualModule({ ...createContext(), found: () => false }) as any
    const content = await module.load('virtual:cloudstack')
    expect(content).toMatchSnapshot()
  })
})
