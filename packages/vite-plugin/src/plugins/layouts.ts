import Layouts from 'vite-plugin-vue-layouts'

import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

export function LayoutsPlugin({ options }: CloudstackPluginContext): PluginOption {
  if (!options.layouts) {
    return
  }

  return Layouts(options.layouts)
}
