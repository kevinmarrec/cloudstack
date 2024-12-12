import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

import { createServer, resolveConfig } from 'vite'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import CloudstackVitePlugin, { type CloudstackPluginOptions } from '../src'

async function createTempDir() {
  const osTmpDir = os.tmpdir()
  const tmpDir = path.resolve(osTmpDir, 'vite-plugin-test')
  return await mkdtemp(tmpDir)
}

const mocks = vi.hoisted(() => ({
  isPackageExists: vi.fn(),
}))

vi.mock('local-pkg', () => ({
  isPackageExists: mocks.isPackageExists,
}))

describe('plugin', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await createTempDir()
  })

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true })
  })

  it('with default options', async () => {
    const baseConfig = await resolveConfig({ root: tmpDir }, 'serve')

    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir)

    const resolvedConfig = await resolveConfig({
      root: tmpDir,
      plugins: [CloudstackVitePlugin()],
    }, 'serve')

    const addedPlugins = resolvedConfig.plugins.filter(plugin => !baseConfig.plugins.some(basePlugin => basePlugin.name === plugin.name))
    const addedPluginNames = addedPlugins.map(plugin => plugin.name)

    expect(addedPluginNames).toMatchSnapshot()
  })

  it('with all options', async () => {
    const baseConfig = await resolveConfig({ root: tmpDir }, 'serve')

    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir)

    mocks.isPackageExists.mockImplementation((pkg: string) => pkg === 'vue-router' || pkg === 'unocss')

    await mkdir(path.resolve(tmpDir, 'src/components'), { recursive: true })
    await writeFile(path.resolve(tmpDir, 'src/components/HelloWorld.vue'), `<template> <h1>Hello World</h1> </template>`)

    await mkdir(path.resolve(tmpDir, 'src/layouts'), { recursive: true })
    await writeFile(path.resolve(tmpDir, 'src/layouts/default.vue'), `<template> <slot /> </template>`)

    await mkdir(path.resolve(tmpDir, 'src/pages'), { recursive: true })
    await writeFile(path.resolve(tmpDir, 'src/pages/Index.vue'), `<template> <h1>Index</h1> </template>`)

    await writeFile(path.resolve(tmpDir, 'uno.config.ts'), `export default {}`)

    const resolvedConfig = await resolveConfig({
      root: tmpDir,
      plugins: [CloudstackVitePlugin({
        pwa: {
          pwaAssets: {
            disabled: true,
          },
        },
      })],
    }, 'serve')

    const addedPlugins = resolvedConfig.plugins.filter(plugin => !baseConfig.plugins.some(basePlugin => basePlugin.name === plugin.name))
    const addedPluginNames = addedPlugins.map(plugin => plugin.name)

    expect(addedPluginNames).toMatchSnapshot()
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
