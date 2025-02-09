/// <reference types="vite-ssg" />

import type { Plugin } from 'vite'

import type { CloudstackPluginContext } from '../../context'
import { integrationFactory } from '../_factory'

export default integrationFactory((ctx: CloudstackPluginContext): Plugin => ({
  name: 'vite:cloudstack:config',
  config() {
    return {
      build: {
        modulePreload: {
          polyfill: false,
        },
      },
      optimizeDeps: {
        include: [
          'vite-ssg',
          'vite-ssg/single-page',
          'vue',
          ...ctx.found('routes') ? ['vue-router', 'unplugin-vue-router/runtime'] : [],
          ...ctx.userOptions.pwa ? ['workbox-window'] : [],
        ],
      },
      ssgOptions: {
        script: 'async',
        formatting: 'minify',
        beastiesOptions: {
          reduceInlineStyles: false,
        },
      },
    }
  },
}), { options: ctx => ctx })
