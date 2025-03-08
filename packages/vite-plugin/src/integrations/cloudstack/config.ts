/// <reference types="vite-ssg" />

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

              return build({
                ...builder.config.ssgOptions,
                mode: builder.config.mode,
              })
            }

            await builder.build(builder.environments.client)
          },
        },
        optimizeDeps: {
          include: [
            'vite-ssg',
            'vite-ssg/single-page',
            'vue',
            ...vueRouter.enabled(ctx) ? ['vue-router', 'unplugin-vue-router/runtime'] : [],
            ...pwa.enabled(ctx) ? ['workbox-window'] : [],
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
            '@cloudstack/vue-i18n',
            '@kevinmarrec/cloudstack-vue-i18n',
          ],
        },
      }),
      config,
    )
  },
}), { options: ctx => ctx })
