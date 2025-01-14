import { isPackageExists } from 'local-pkg'
import { globSync } from 'tinyglobby'

import type { VitePluginConfig as UnocssPluginOptions } from '@unocss/vite'
import type { Options as VuePluginOptions } from '@vitejs/plugin-vue'
import type { Options as AutoImportPluginOptions } from 'unplugin-auto-import/types'
import type { Options as ComponentsPluginOptions } from 'unplugin-vue-components/types'
import type { Options as VueRouterPluginOptions } from 'unplugin-vue-router/types'
import type { VitePWAOptions as PWAPluginOptions } from 'vite-plugin-pwa'
import type { VitePluginVueDevToolsOptions as VueDevToolsPluginOptions } from 'vite-plugin-vue-devtools'
import type { UserOptions as LayoutsPluginOptions } from 'vite-plugin-vue-layouts'

export interface CloudstackPluginOptions {
  /**
   * `unplugin-auto-import` plugin configuration.
   *
   * The plugin is enabled by default and configured to auto import the following APIs:
   * - `vue`
   * - `vue-router` (if some conditions are met, see `router` option)
   *
   * And the following directories:
   * - `src/composables`
   * - `src/directives`
   *
   * The generated types are written to `src/types/auto-imports.d.ts`.
   *
   * Set to `false` to disable.
   *
   * @see https://github.com/unplugin/unplugin-auto-import
   */
  autoImports?: false | AutoImportPluginOptions
  /**
   * `unplugin-vue-components` plugin configuration.
   *
   * The plugin is automatically enabled if components are found in the `src/components` directory.
   *
   * The generated types are written to `src/types/components.d.ts`.
   *
   * Set to `false` to disable.
   *
   * @see https://github.com/unplugin/unplugin-vue-components
   */
  components?: false | ComponentsPluginOptions
  /**
   * `vite-plugin-vue-devtools` plugin configuration.
   *
   * The plugin is enabled by default.
   *
   * Set to `false` to disable.
   *
   * @see https://github.com/vuejs/devtools-next
   */
  devtools?: false | VueDevToolsPluginOptions
  /**
   * `vite-plugin-vue-layouts` plugin configuration.
   *
   * The plugin is automatically enabled if the following conditions are met:
   * - `vue-router` dependency is installed
   * - `.vue` files are found in the `src/layouts` directory
   *
   * Set to `false` to disable.
   *
   * @see https://github.com/JohnCampionJr/vite-plugin-vue-layouts
   */
  layouts?: false | LayoutsPluginOptions
  /**
   * `vite-plugin-pwa` plugin configuration.
   *
   * @see https://github.com/vite-pwa/vite-plugin-pwa
   */
  pwa?: boolean | Partial<PWAPluginOptions>
  /**
   * `unplugin-vue-router` plugin configuration.
   *
   * This plugin is automatically enabled if the following conditions are met:
   * - `vue-router` dependency is installed
   * - `.vue` files are found in the `src/pages` directory
   *
   * The generated types are written to `src/types/router.d.ts`.
   *
   * Set to `false` to disable.
   *
   * @see https://github.com/posva/unplugin-vue-router
   */
  router?: false | VueRouterPluginOptions
  /**
   * `@unocss/vite` plugin configuration.
   *
   * The plugin is automatically enabled if the following conditions are met:
   * - `unocss` dev dependency is installed
   * - `uno.config.ts` file is found in the project root
   *
   * Set to `false` to disable.
   *
   * @see https://github.com/unocss/unocss
   */
  unocss?: false | UnocssPluginOptions
  /**
   * `@vitejs/plugin-vue` plugin configuration.
   *
   * The plugin is mandatory, therefore enabled by default and cannot be disabled.
   *
   * @see https://github.com/vitejs/vite-plugin-vue
   */
  vue?: VuePluginOptions
}

export type ResolvedCloudstackPluginOptions = {
  [K in keyof CloudstackPluginOptions]-?: CloudstackPluginOptions[K]
}

export function resolveOptions(userOptions: CloudstackPluginOptions): ResolvedCloudstackPluginOptions {
  return {
    autoImports: userOptions.autoImports ?? {},
    components: userOptions.components ?? (globSync(['**/*.vue'], { cwd: 'src/components' }).length > 0 && {}),
    devtools: userOptions.devtools ?? {},
    layouts: userOptions.layouts ?? (isPackageExists('vue-router') && globSync(['**/*.vue'], { cwd: 'src/layouts' }).length > 0 && {}),
    pwa: userOptions.pwa ?? false,
    router: userOptions.router ?? (isPackageExists('vue-router') && globSync(['**/*.vue'], { cwd: 'src/pages' }).length > 0 && {}),
    unocss: userOptions.unocss ?? (isPackageExists('unocss') && globSync(['uno.config.ts']).length > 0 && {}),
    vue: userOptions.vue ?? {},
  }
}
