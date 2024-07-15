/// <reference types="vite-ssg" />

import { readFileSync } from 'node:fs'
import path from 'node:path'

import Vue from '@vitejs/plugin-vue'
import defu from 'defu'
import getCallerFile from 'get-caller-file'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { mergeConfig } from 'vite'
import type { Plugin, PluginOption, UserConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'

export interface VitePluginConfig {
  root: string
  autoImports?: boolean | Parameters<typeof AutoImport>[0]
  components?: boolean | Parameters<typeof Components>[0]
  devtools?: boolean | Parameters<typeof VueDevTools>[0]
  layouts?: boolean | Parameters<typeof Layouts>[0]
  pwa?: boolean | Parameters<typeof VitePWA>[0]
  router?: boolean | Parameters<typeof VueRouter>[0]
  unocss?: boolean | Parameters<typeof Unocss>[0]
}

export default function CloudstackVitePlugin(config: VitePluginConfig): PluginOption[] {
  function configurePlugin<T extends (...args: any) => PluginOption>(plugin: T, userConfig: boolean | Parameters<T>[0], defaultConfig?: Parameters<T>[0]): PluginOption {
    return userConfig && plugin(defu(userConfig, defaultConfig))
  }

  const plugins: PluginOption[] = [
    // https://github.com/antfu/unplugin-auto-import
    configurePlugin(AutoImport, config.autoImports, {
      dts: 'src/types/auto-imports.d.ts',
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          'unplugin-vue-router/runtime': [
            'definePage',
          ],
        },
        {
          '@unhead/vue': [
            'useHead',
            'useHeadSafe',
            'useSeoMeta',
          ],
        },
        '@vueuse/core',
      ],
      dirs: [
        'src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    configurePlugin(Components, config.components, {
      dts: 'src/types/components.d.ts',
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    configurePlugin(Layouts, config.layouts),

    // https://github.com/unocss/unocss
    configurePlugin(Unocss, config.unocss),

    // https://github.com/antfu/vite-plugin-pwa
    configurePlugin(VitePWA, config.pwa, {
      registerType: 'autoUpdate',
      manifest: {
        name: 'Vite PWA',
        short_name: 'Vite PWA',
        theme_color: '#ffffff',
      },
      pwaAssets: {
        overrideManifestIcons: true,
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        type: 'module',
      },
    }),

    // https://github.com/vitejs/vite-plugin-vue
    Vue(),

    // https://github.com/posva/unplugin-vue-router
    configurePlugin(VueRouter, config.router, {
      dts: 'src/types/router.d.ts',
    }),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    configurePlugin(VueDevTools, config.devtools),

    // Additional configuration
    {
      name: '@kevinmarrec/cloudstack',
      config(userConfig) {
        return mergeConfig<UserConfig, UserConfig>(userConfig, {
          resolve: {
            alias: {
              '~': path.resolve(config.root, 'src'),
            },
          },
          optimizeDeps: {
            include: ['workbox-window'],
          },
          ssgOptions: {
            script: 'async',
            formatting: 'minify',
            crittersOptions: {
              reduceInlineStyles: false,
            },
          },
        })
      },
      transformIndexHtml(html) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              injectTo: 'head',
              children: readFileSync(path.join(import.meta.dirname, 'darkMode.script.js'), 'utf-8'),
            },
          ],
        }
      },
    },
  ]

  return plugins.filter(Boolean)
}
