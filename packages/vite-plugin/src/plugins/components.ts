import defu from 'defu'
import Components from 'unplugin-vue-components/vite'

import type { Options } from 'unplugin-vue-components/types'
import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

export function ComponentsPlugin({ options }: CloudstackPluginContext): PluginOption {
  if (!options.components) {
    return
  }

  const defaults: Options = {
    dts: 'src/types/components.d.ts',
  }

  return Components(defu(options.components, defaults))
}
