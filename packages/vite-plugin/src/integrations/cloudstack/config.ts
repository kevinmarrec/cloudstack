/// <reference types="vite-ssg" />

import { mergeConfig, type Plugin } from 'vite'

import type { CloudstackPluginContext } from '../../context'
import { integrationFactory } from '../_factory'
import pwa from '../pwa'
import vueRouter from '../vue-router'

export default integrationFactory((ctx: CloudstackPluginContext): Plugin => ({
  name: 'cloudstack:config',
  config(config) {
    return mergeConfig({
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
    }, config)
  },
}), { options: ctx => ctx })
