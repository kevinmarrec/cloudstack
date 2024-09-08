import defu from 'defu'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import type { Options } from 'unplugin-auto-import/types'
import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

export function AutoImportsPlugin({ options }: CloudstackPluginContext): PluginOption {
  if (!options.autoImports) {
    return
  }

  const defaults: Options = {
    dts: 'src/types/auto-imports.d.ts',
    dirs: ['src/composables'],
    imports: options.router ? ['vue', VueRouterAutoImports] : ['vue'],
  }

  return AutoImport(defu(options.autoImports, defaults))
}
