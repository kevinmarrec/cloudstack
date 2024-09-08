import Vue, { type Options } from '@vitejs/plugin-vue'
import defu from 'defu'

import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

export function VuePlugin({ options }: CloudstackPluginContext): PluginOption {
  const defaults: Options = {
    features: {
      optionsAPI: false,
    },
  }

  return Vue(defu(options.vue, defaults))
}
