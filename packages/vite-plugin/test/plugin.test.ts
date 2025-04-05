import fs from 'node:fs/promises'
import process from 'node:process'

import { resolve } from 'pathe'
import { createServer, resolveConfig, type ViteBuilder } from 'vite'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createTempDir } from '../../../test/utils'
import CloudstackVitePlugin from '../src'
import { type CloudstackPluginContext, createContext } from '../src/context'
import virtualModule from '../src/integrations/cloudstack/virtual'
import { configDiff } from './utils'

vi.mock('local-pkg', () => ({
  isPackageExists: () => true,
}))

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
  it.each([
    { command: 'serve', mode: 'development' },
    { command: 'build', mode: 'production' },
    { command: 'build', mode: 'analyze' },
  ] as const)('with defaults (mode: $mode)', async ({ command, mode }) => {
    const baseConfig = await resolveConfig({}, command, mode)
    const resolvedConfig = await resolveConfig({
      plugins: [CloudstackVitePlugin({}, { command, mode })],
    }, command, mode)

    expect(resolvedConfig.build.sourcemap).toBe(mode === 'analyze')
    expect(configDiff(baseConfig, resolvedConfig).plugins).toMatchSnapshot()
  })

  it.each([
    { command: 'serve', mode: 'development' },
    { command: 'build', mode: 'production' },
  ] as const)('with all integrations (mode: $mode)', async ({ command, mode }) => {
    await fs.writeFile(resolve(tmpDir, 'uno.config.ts'), `export default {}`)
    await fs.mkdir(resolve(tmpDir, 'src/views'), { recursive: true })
    await fs.writeFile(resolve(tmpDir, 'src/views/index.vue'), `<template></template>`)

    const baseConfig = await resolveConfig({}, command, mode)

    const resolvedConfig = await resolveConfig({
      plugins: [CloudstackVitePlugin({
        pwa: true,
        vueRouter: {
          routesFolder: [
            { src: 'src/views' },
          ],
        },
      }, { command, mode })],
    }, command, mode)

    expect(configDiff(baseConfig, resolvedConfig).plugins).toMatchSnapshot()
  })

  it.each([
    'generateSW',
    'injectManifest',
  ] as const)('with different pwa strategy ($0)', async (strategy) => {
    const command = 'build'
    const mode = 'production'

    const baseConfig = await resolveConfig({}, command, mode)

    const resolvedConfig = await resolveConfig({
      plugins: [CloudstackVitePlugin({
        pwa: {
          strategies: strategy,
        },
      }, { command, mode })],
    }, command, mode)

    expect(configDiff(baseConfig, resolvedConfig).plugins).toMatchSnapshot()
  })

  it('should call custom app builder when using static mode', async () => {
    const resolvedConfig = await resolveConfig({ plugins: [CloudstackVitePlugin()] }, 'build')

    const defaultBuildSpy = vi.fn()
    const ssgBuildSpy = vi.fn()

    vi.doMock('vite-ssg/node', () => ({
      build: ssgBuildSpy,
    }))

    const getBuilder = (mode: string) => ({
      build: defaultBuildSpy,
      config: { mode },
      environments: {},
    }) as unknown as ViteBuilder

    await resolvedConfig.builder?.buildApp?.(getBuilder('production'))
    expect(defaultBuildSpy).toHaveBeenCalled()
    expect(ssgBuildSpy).not.toHaveBeenCalled()

    defaultBuildSpy.mockClear()

    await resolvedConfig.builder?.buildApp?.(getBuilder('static'))
    expect(defaultBuildSpy).not.toHaveBeenCalled()
    expect(ssgBuildSpy).toHaveBeenCalled()
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
    const html = await server.transformIndexHtml('index.html', '<html><head></head><body></body></html>')

    expect(html).toMatchSnapshot()
  })

  it('should deduplicate icon link from index.html when PWA is enabled', async () => {
    const link = '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />'
    const server = await createServer({ plugins: [CloudstackVitePlugin({ pwa: true })] })
    const html = await server.transformIndexHtml('index.html', `<html><head>${link}</head><body></body></html>`)

    expect(html).not.toContain(link)
  })
})

describe('virtual module', async () => {
  function virtualModuleContentFromContext(ctx: CloudstackPluginContext) {
    const module: any = virtualModule(ctx)
    const content = module.load('virtual:cloudstack')
      .replace(/ {8}/g, '')
      .replace(/^\s*(\n|$)/gm, '')

    return content
  }

  it('should resolve virtual module id', async () => {
    const module: any = virtualModule(createContext({}))

    expect(module.resolveId('virtual:cloudstack')).toEqual('virtual:cloudstack')
  })

  it('should generate virtual module content (with router, i18n & unocss)', async () => {
    await fs.writeFile(resolve(tmpDir, 'uno.config.ts'), `export default {}`)
    await fs.mkdir(resolve(tmpDir, 'src/pages'), { recursive: true })
    await fs.writeFile(resolve(tmpDir, 'src/pages/index.vue'), `<template></template>`)
    await fs.mkdir(resolve(tmpDir, 'src/locales'), { recursive: true })
    await fs.writeFile(resolve(tmpDir, 'src/locales/en.yml'), `hello: Hello`)

    const content = virtualModuleContentFromContext(createContext())
    const contentWithI18nOptions = virtualModuleContentFromContext(createContext({
      i18n: {
        locale: 'fr',
        fallbackLocale: 'en',
      },
    }))

    expect(content).toMatchSnapshot()
    expect(contentWithI18nOptions).toMatchSnapshot()
  })

  it('should generate virtual module content, (SPA)', async () => {
    const content = virtualModuleContentFromContext(createContext())
    expect(content).toMatchSnapshot()
  })

  it('should generate virtual module content, (PWA)', async () => {
    const content = virtualModuleContentFromContext(createContext({ pwa: true }))
    expect(content).toMatchSnapshot()
  })
})
