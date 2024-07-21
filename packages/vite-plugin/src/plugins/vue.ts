import Vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

export function VuePlugin({ options }: CloudstackPluginContext): PluginOption {
  return Vue(options.vue)
}
