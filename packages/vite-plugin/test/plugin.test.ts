import fs from 'node:fs/promises'
import process from 'node:process'

import { resolve } from 'pathe'
import { createServer, resolveConfig, type ViteBuilder } from 'vite'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createTempDir } from '../../../test/utils'
import CloudstackVitePlugin, { type CloudstackPluginOptions } from '../src'
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
  await fs.mkdir(resolve(tmpDir, 'public'))
  await fs.writeFile(resolve(tmpDir, 'public/favicon.svg'), `<svg></svg>`)
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
        vueRouter: {
          routesFolder: [
            { src: 'src/views' },
          ],
        },
      }, { command, mode })],
    }, command, mode)

    expect(configDiff(baseConfig, resolvedConfig).plugins).toMatchSnapshot()
  })

  it('without pwa', async () => {
    const command = 'build'
    const mode = 'production'

    const baseConfig = await resolveConfig({}, command, mode)

    const resolvedConfig = await resolveConfig({
      plugins: [CloudstackVitePlugin({ pwa: false }, { command, mode })],
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
    const html = await server.transformIndexHtml('index.html', '<html></html>')

    expect(html).toMatchSnapshot()
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
})
