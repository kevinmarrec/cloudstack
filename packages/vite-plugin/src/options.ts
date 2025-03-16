import type { PluginOptions as YAMLPluginOptions } from '@modyfi/vite-plugin-yaml'
import type { VitePluginConfig as UnocssPluginOptions } from '@unocss/vite'
import type { Options as VuePluginOptions } from '@vitejs/plugin-vue'
import type { PluginVisualizerOptions } from 'rollup-plugin-visualizer'
import type { Options as VueRouterPluginOptions } from 'unplugin-vue-router'
import type { VitePWAOptions as PWAPluginOptions } from 'vite-plugin-pwa'
import type { VitePluginVueDevToolsOptions as VueDevToolsPluginOptions } from 'vite-plugin-vue-devtools'
import type { PluginOptions as TsConfigPathsPluginOptions } from 'vite-tsconfig-paths'

export interface CloudstackPluginOptions {
  /**
   * I18n integration options.
   *
   * The integration is automatically enabled if the following conditions are met:
   * - Any `.json`, `.yaml` or `.yml` file is found in the project's locales folder.
   *
   *  The file detection is based on the `localesFolder` option of this integration (defaults to `src/locales`).
   */
  i18n?: {
    /**
     * The locales folder path.
     *
     * @default 'src/locales'
     */
    localesFolder?: string
    /**
     * The default locale to use.
     *
     * @default 'en'
     *
     */
    locale?: string
    /**
     * The fallback locale to use when translation is missing for the current locale.
     *
     * Defaults to the default locale (`en` if not set).
     *
     */
    fallbackLocale?: string
  }
  /**
   * `vite-plugin-pwa` plugin options.
   *
   * The plugin is disabled by default.
   *
   * Set to `true` to enable with default options.
   *
   * @see https://github.com/vite-pwa/vite-plugin-pwa
   */
  pwa?: boolean | Partial<PWAPluginOptions>
  /**
   * `vite-tsconfig-paths` plugin options.
   *
   * The plugin is enabled by default.
   *
   * @see https://github.com/aleclarson/vite-tsconfig-paths
   */
  tsconfigPaths?: TsConfigPathsPluginOptions
  /**
   * `@unocss/vite` plugin options.
   *
   * The plugin is automatically enabled if the following conditions are met:
   * - `unocss` package is installed in the project.
   * - `uno.config.ts` file is found in the project.
   *
   * @see https://github.com/unocss/unocss
   */
  unocss?: UnocssPluginOptions
  /**
   * `rollup-plugin-visualizer` plugin options.
   *
   * The plugin is only enabled when passing `analyze` mode to Vite (`vite build --mode analyze`).
   *
   * @see https://github.com/btd/rollup-plugin-visualizer
   */
  visualizer?: PluginVisualizerOptions
  /**
   * `@vitejs/plugin-vue` plugin options.
   *
   * The plugin is mandatory, therefore enabled by default and cannot be disabled.
   *
   * @see https://github.com/vitejs/vite-plugin-vue
   */
  vue?: VuePluginOptions
  /**
   * `vite-plugin-vue-devtools` plugin options.
   *
   * The plugin is enabled by default.
   *
   * Set to `false` to disable.
   *
   * @see https://github.com/vuejs/devtools-next
   */
  vueDevTools?: false | VueDevToolsPluginOptions
  /**
   * `unplugin-vue-router` plugin options.
   *
   * The plugin is automatically enabled if the following conditions are met:
   * - `vue-router` package is installed in the project.
   * - Any `.vue` file is found in the project's routes folder.
   *
   * The file detection is based on the `routesFolder` option of this plugin (defaults to `src/pages`).
   *
   * @see https://github.com/posva/unplugin-vue-router
   */
  vueRouter?: VueRouterPluginOptions
  /**
   * `@modyfi/vite-plugin-yaml` plugin options.
   *
   * The plugin is enabled by default.
   *
   * @see https://github.com/Modyfi/vite-plugin-yaml
   */
  yaml?: YAMLPluginOptions
}
