import defu from 'defu'
import type { Options } from 'unplugin-auto-import/types'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

export function AutoImportsPlugin({ options }: CloudstackPluginContext): PluginOption {
  if (!options.autoImports) {
    return
  }

  const defaults: Options = {
    dts: 'src/types/auto-imports.d.ts',
    imports: [
      'vue',
      ...options.router
        ? [
            VueRouterAutoImports,
            {
              'unplugin-vue-router/runtime': [
                'definePage',
              ],
            },
          ]
        : [],
    ],
    dirs: [
      'src/composables',
    ],
  }

  return AutoImport(defu(options.autoImports, defaults))
}
