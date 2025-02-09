import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import { createServer, resolveConfig } from 'vite'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createTempDir } from '../../../test/utils'
import CloudstackVitePlugin from '../src'
import { createContext } from '../src/context'
import virtualModule from '../src/integrations/cloudstack/global'
import { configDiff } from './utils'

let tmpDir: string

beforeEach(async () => {
  tmpDir = await createTempDir('vite-plugin')
  vi.spyOn(process, 'cwd').mockReturnValue(tmpDir)
})

afterEach(async () => {
  await fs.rm(tmpDir, { recursive: true, force: true })
  vi.restoreAllMocks()
})

describe('plugin', () => {
  it('with defaults', async () => {
    const baseConfig = await resolveConfig({}, 'serve')
    const resolvedConfig = await resolveConfig({ plugins: [CloudstackVitePlugin()] }, 'serve')

    expect(configDiff(baseConfig, resolvedConfig).plugins).toMatchSnapshot()
  })

  it.each([
    { command: 'serve', mode: 'development' },
    { command: 'build', mode: 'production' },
    { command: 'build', mode: 'analyze' },
  ] as const)('with all integrations (mode: $mode)', async ({ command, mode }) => {
    await fs.writeFile(path.resolve(tmpDir, 'uno.config.ts'), `export default {}`)
    await fs.mkdir(path.resolve(tmpDir, 'src/views'), { recursive: true })
    await fs.writeFile(path.resolve(tmpDir, 'src/views/index.vue'), `<template></template>`)

    const baseConfig = await resolveConfig({}, command, mode)

    const resolvedConfig = await resolveConfig({
      plugins: [CloudstackVitePlugin({
        pwa: {
          pwaAssets: {
            disabled: true,
          },
        },
        vueRouter: {
          routesFolder: [
            { src: 'src/views' },
          ],
        },
      }, { command, mode })],
    }, command, mode)

    expect(configDiff(baseConfig, resolvedConfig).plugins).toMatchSnapshot()
  })

  it('should drop module preload polyfill', async () => {
    const resolvedConfig = await resolveConfig({ plugins: [CloudstackVitePlugin()] }, 'serve')

    expect(resolvedConfig.build.modulePreload).toEqual({ polyfill: false })
  })

  it('should optimize dependencies', async () => {
    const resolvedConfig = await resolveConfig({ plugins: [CloudstackVitePlugin()] }, 'serve')

    expect(resolvedConfig.optimizeDeps.include).toMatchSnapshot()
  })

  it('should inject dark mode script in index.html', async () => {
    const server = await createServer({ plugins: [CloudstackVitePlugin()] })
    const html = await server.transformIndexHtml('index.html', '<html></html>')

    expect(html).toMatchSnapshot()
  })
})

describe('virtual module', async () => {
  it('should resolve virtual module id', async () => {
    const module: any = virtualModule(createContext({}))

    expect(module.resolveId('virtual:cloudstack')).toEqual('virtual:cloudstack')
  })

  it('should generate virtual module content (MPA with unocss)', async () => {
    await fs.writeFile(path.resolve(tmpDir, 'uno.config.ts'), `export default {}`)
    await fs.mkdir(path.resolve(tmpDir, 'src/pages'), { recursive: true })
    await fs.writeFile(path.resolve(tmpDir, 'src/pages/index.vue'), `<template></template>`)

    const module: any = virtualModule(createContext())
    const content = module.load('virtual:cloudstack')

    expect(content).toMatchSnapshot()
  })

  it('should generate virtual module content, (SPA)', async () => {
    const module: any = virtualModule(createContext())
    const content = module.load('virtual:cloudstack')

    expect(content).toMatchSnapshot()
  })
})
