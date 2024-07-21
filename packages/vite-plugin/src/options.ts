import type { Options as VuePluginOptions } from '@vitejs/plugin-vue'
import type { VitePluginConfig as UnocssPluginOptions } from 'unocss/vite'
import type { Options as AutoImportPluginOptions } from 'unplugin-auto-import/types'
import type { Options as ComponentsPluginOptions } from 'unplugin-vue-components/types'
import type { Options as VueRouterPluginOptions } from 'unplugin-vue-router/types'
import type { VitePWAOptions as PWAPluginOptions } from 'vite-plugin-pwa'
import type { VitePluginVueDevToolsOptions as VueDevToolsPluginOptions } from 'vite-plugin-vue-devtools'
import type { UserOptions as LayoutsPluginOptions } from 'vite-plugin-vue-layouts'

export interface ViteCloudstackOptions {
  /**
   * On-demand APIs auto importing.
   * @see https://github.com/unplugin/unplugin-auto-import
   * @default true
   */
  autoImports?: boolean | AutoImportPluginOptions
  /**
   * On-demand components auto importing.
   * @see https://github.com/unplugin/unplugin-vue-components
   * @default true
   */
  components?: boolean | ComponentsPluginOptions
  /**
   * Vue DevTools Vite integration.
   * @see https://github.com/vuejs/devtools-next
   * @default true
   */
  devtools?: boolean | VueDevToolsPluginOptions
  /**
   * Automatic file based layouts (with Vue Router).
   * @see https://github.com/JohnCampionJr/vite-plugin-vue-layouts
   * @default false
   */
  layouts?: boolean | LayoutsPluginOptions
  /**
   * PWA Vite integration.
   * @see https://github.com/vite-pwa/vite-plugin-pwa
   * @default false
   */
  pwa?: boolean | PWAPluginOptions
  /**
   * Automatic file based routing (with Vue Router).
   * @see https://github.com/posva/unplugin-vue-router
   * @default false
   */
  router?: boolean | VueRouterPluginOptions
  /**
   * Unocss Vite integration.
   * @see https://github.com/unocss/unocss
   * @default false
   */
  unocss?: boolean | UnocssPluginOptions
  /**
   * Vite Vue Plugin configuration.
   * @see https://github.com/vitejs/vite-plugin-vue
   */
  vue?: VuePluginOptions
}

export type ResolvedViteCloudstackOptions = {
  [K in keyof ViteCloudstackOptions]-?: Exclude<ViteCloudstackOptions[K], true>
}

function normalizeOptions<T extends object>(options: T | boolean | undefined, isDefaultEnabled: boolean) {
  if (options === true || (options === undefined && isDefaultEnabled)) {
    return {} as T
  }

  return options ?? false
}

export function resolveOptions(userOptions: ViteCloudstackOptions): ResolvedViteCloudstackOptions {
  return {
    autoImports: normalizeOptions(userOptions.autoImports, true),
    components: normalizeOptions(userOptions.components, true),
    devtools: normalizeOptions(userOptions.devtools, true),
    layouts: normalizeOptions(userOptions.layouts, false),
    pwa: normalizeOptions(userOptions.pwa, false),
    router: normalizeOptions(userOptions.router, false),
    unocss: normalizeOptions(userOptions.unocss, false),
    vue: userOptions.vue ?? {},
  }
}
