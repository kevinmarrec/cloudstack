/// <reference types="vite-ssg" />

import process from 'node:process'

import { defineConfig, mergeConfig, type Plugin } from 'vite'

import type { CloudstackPluginContext } from '../../context'
import { integrationFactory } from '../_factory'
import pwa from '../pwa'
import visualizer from '../visualizer'
import vueRouter from '../vue-router'

export default integrationFactory((ctx: CloudstackPluginContext): Plugin => ({
  name: 'cloudstack:config',
  config(config) {
    return mergeConfig(
      defineConfig({
        build: {
          modulePreload: {
            polyfill: false,
          },
          sourcemap: visualizer.enabled(ctx),
        },
        builder: {
          async buildApp(builder) {
            if (builder.config.mode === 'static') {
              const { build } = await import('vite-ssg/node')
              await build(builder.config.ssgOptions)
              process.exit(0)
            }

            await builder.build(builder.environments.client)
          },
        },
        optimizeDeps: {
          include: [
            '@kevinmarrec/cloudstack-vue-i18n',
            '@kevinmarrec/cloudstack-vue-pwa',
            'vite-ssg',
            'vite-ssg/single-page',
            'vue',
            ...vueRouter.enabled(ctx) ? ['vue-router', 'unplugin-vue-router/runtime'] : [],
            ...pwa.enabled(ctx) ? ['workbox-window'] : [],
          ],
          exclude: [
            'virtual:pwa-register',
          ],
        },
        ssgOptions: {
          script: 'async',
          formatting: 'minify',
          beastiesOptions: {
            reduceInlineStyles: false,
          },
        },
        ssr: {
          noExternal: [
            '@cloudstack/vue',
            '@kevinmarrec/cloudstack-vue',
            '@kevinmarrec/cloudstack-vue-i18n',
            '@kevinmarrec/cloudstack-vue-pwa',
          ],
        },
      }),
      config,
    )
  },
  transformIndexHtml(html) {
    if (pwa.enabled(ctx)) {
      return html.replace(/<link[^>]*rel="icon"[^>]*>/, '')
    }
  },
}), { options: ctx => ctx })
