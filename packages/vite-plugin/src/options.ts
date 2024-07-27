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
   *
   * @see https://github.com/unplugin/unplugin-auto-import
   */
  autoImports?: false | AutoImportPluginOptions
  /**
   * On-demand components auto importing.
   *
   * This option is enabled by default if components are found in the `src/components` directory.
   * @see https://github.com/unplugin/unplugin-vue-components
   */
  components?: false | ComponentsPluginOptions
  /**
   * Vue DevTools Vite integration.
   * @see https://github.com/vuejs/devtools-next
   */
  devtools?: false | VueDevToolsPluginOptions
  /**
   * Automatic file based layouts (with Vue Router).
   * @see https://github.com/JohnCampionJr/vite-plugin-vue-layouts
   * @requires `vue-router` dependency to be installed
   * @default true if `src/layouts` directory exists
   */
  layouts?: boolean | LayoutsPluginOptions
  /**
   * PWA Vite integration.
   * @see https://github.com/vite-pwa/vite-plugin-pwa
   * @default false
   */
  pwa?: boolean | Partial<PWAPluginOptions>
  /**
   * Automatic file based routing (with Vue Router).
   *
   * This option is enabled by default if `vue-router` is installed and pages are found in the `src/pages` directory.
   * @see https://github.com/posva/unplugin-vue-router
   * @requires `vue-router` dependency to be installed
   * @requires  pages are found in the `src/pages` directory
   */
  router?: boolean | VueRouterPluginOptions
  /**
   * Unocss Vite integration.
   * @see https://github.com/unocss/unocss
   * @requires `unocss.config.ts` in project root
   * @default true if `uno.config.{js,ts,mjs,mts}` or `unocss.config.{js,ts,mjs,mts}` exists in project root
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
