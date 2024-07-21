import defu from 'defu'
import type { Options } from 'unplugin-vue-router/types'
import VueRouter from 'unplugin-vue-router/vite'
import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

export function VueRouterPlugin({ options }: CloudstackPluginContext): PluginOption {
  if (!options.router) {
    return
  }

  const defaults: Options = {
    dts: 'src/types/router.d.ts',
  }

  return VueRouter(defu(options.router, defaults))
}
