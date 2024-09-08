import VueDevTools from 'vite-plugin-vue-devtools'

import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

export function VueDevToolsPlugin({ options }: CloudstackPluginContext): PluginOption {
  if (!options.devtools) {
    return
  }

  return VueDevTools(options.devtools)
}
