import type { VitePluginConfig as UnocssPluginOptions } from '@unocss/vite'
import type { Options as VuePluginOptions } from '@vitejs/plugin-vue'
import type { VitePWAOptions as PWAPluginOptions } from 'vite-plugin-pwa'
import type { VitePluginVueDevToolsOptions as VueDevToolsPluginOptions } from 'vite-plugin-vue-devtools'

export interface CloudstackPluginOptions {
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
   * `vite-plugin-pwa` plugin configuration.
   *
   * @see https://github.com/vite-pwa/vite-plugin-pwa
   */
  pwa?: boolean | Partial<PWAPluginOptions>
  /**
   * `@unocss/vite` plugin configuration.
   *
   * The plugin is automatically enabled if the following conditions is met:
   * - `uno.config.ts` file is found in the project
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
