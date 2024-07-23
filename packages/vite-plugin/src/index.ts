import type { PluginOption } from 'vite'

import { createContext } from './context'
import type { ViteCloudstackOptions } from './options'
import { AutoImportsPlugin } from './plugins/auto-import'
import { ComponentsPlugin } from './plugins/components'
import { LayoutsPlugin } from './plugins/layouts'
import { MainPlugin } from './plugins/main'
import { PWAPlugin } from './plugins/pwa'
import { UnoCSSPlugin } from './plugins/unocss'
import { VuePlugin } from './plugins/vue'
import { VueDevToolsPlugin } from './plugins/vue-devtools'
import { VueRouterPlugin } from './plugins/vue-router'

export { type ViteCloudstackOptions }

export default function CloudstackVitePlugin(userOptions: ViteCloudstackOptions = {}): PluginOption[] {
  const ctx = createContext(userOptions)

  return [
    MainPlugin(ctx),
    AutoImportsPlugin(ctx),
    ComponentsPlugin(ctx),
    LayoutsPlugin(ctx),
    PWAPlugin(ctx),
    UnoCSSPlugin(ctx),
    VueRouterPlugin(ctx),
    VuePlugin(ctx),
    VueDevToolsPlugin(ctx),
  ].filter(Boolean)
}
