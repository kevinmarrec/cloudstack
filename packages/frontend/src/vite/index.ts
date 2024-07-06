/// <reference types="vite-ssg" />

import { readFileSync } from 'node:fs'
import path from 'node:path'

import Vue from '@vitejs/plugin-vue'
import defu from 'defu'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { mergeConfig } from 'vite'
import type { PluginOption, UserConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import WebfontDownload from 'vite-plugin-webfont-dl'

interface FrameworkOptions {
  root: string
  autoImports?: Parameters<typeof AutoImport>[0]
  components?: Parameters<typeof Components>[0]
  layouts?: Parameters<typeof Layouts>[0]
  pwa?: Parameters<typeof VitePWA>[0]
  unocss?: Parameters<typeof Unocss>[0]
  vue?: Parameters<typeof Vue>[0]
  vueRouter?: Parameters<typeof VueRouter>[0]
  vueDevTools?: Parameters<typeof VueDevTools>[0]
  webfontDownload?: Parameters<typeof WebfontDownload>[0]
}

function applyDefaults(options: FrameworkOptions) {
  options.autoImports = defu(options.autoImports, {
    dts: 'src/types/auto-imports.d.ts',
    imports: [
      'vue',
      VueRouterAutoImports,
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
      'src/stores',
    ],
  } satisfies FrameworkOptions['autoImports'])

  options.components = defu(options.components, {
    dts: 'src/types/components.d.ts',

  } satisfies FrameworkOptions['components'])

  options.pwa = defu(options.pwa, {
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
      type: 'module',
    },
  } satisfies FrameworkOptions['pwa'])

  options.vueRouter = defu(options.vueRouter, {
    dts: 'src/types/router.d.ts',
  } satisfies FrameworkOptions['vueRouter'])
}

export default function framework(options: FrameworkOptions): PluginOption[] {
  applyDefaults(options)

  return [
    // https://github.com/antfu/unplugin-auto-import
    AutoImport(options.autoImports),

    // https://github.com/antfu/unplugin-vue-components
    Components(options.components),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(options.layouts),

    // https://github.com/unocss/unocss
    Unocss(options.unocss),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA(options.pwa),

    // https://github.com/vitejs/vite-plugin-vue
    Vue(options.vue),

    // https://github.com/posva/unplugin-vue-router
    VueRouter(options.vueRouter),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools(options.vueDevTools),

    // https://github.com/feat-agency/vite-plugin-webfont-dl
    WebfontDownload(options.webfontDownload),

    // Additional configuration
    {
      config(config) {
        return mergeConfig<UserConfig, UserConfig>(config, {
          resolve: {
            alias: {
              '~': path.resolve(options.root, 'src'),
            },
          },
          optimizeDeps: {
            include: [
              '@unhead/vue',
              '@vueuse/core',
              'workbox-window',
            ],
          },
          ssgOptions: {
            script: 'async',
            formatting: 'minify',
          },
        })
      },
      transformIndexHtml(html) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              children: readFileSync(path.join(import.meta.url.replace('file:', ''), '../darkMode.script.js'), 'utf-8'),
              injectTo: 'head',
            },
          ],
        }
      },
    },
  ]
}
