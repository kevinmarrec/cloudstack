/// <reference types="vite-ssg" />

import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import type { Plugin } from 'vite'

import type { CloudstackPluginContext } from '../../context'

const virtualModuleId = 'virtual:cloudstack'
const resolvedVirtualModuleId = `\0${virtualModuleId}`

export function MainPlugin(ctx: CloudstackPluginContext): Plugin {
  return {
    name: 'vite:cloudstack',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const imports = [
          `import 'the-new-css-reset'`,
          `import 'uno.css'`,
          `import { routes } from 'vue-router/auto-routes'`,
          `import { ViteSSG } from 'vite-ssg'`,
        ]

        if (ctx.options.layouts) {
          imports.push(`import { setupLayouts } from 'virtual:generated-layouts'`)
        }

        const exports = [
          `export const Power = (App, fn) => ViteSSG(App, { base: import.meta.env.BASE_URL, ${ctx.options.layouts ? 'routes' : 'routes: setupLayouts(routes)'} }, fn)`,
        ]

        return [...imports, ...exports].join('\n')
      }
    },

    config(userConfig) {
      return {
        resolve: {
          alias: {
            /* c8 ignore next */
            '~': path.resolve(userConfig.root ?? process.cwd(), 'src'),
          },
        },
        optimizeDeps: {
          include: ctx.options.pwa ? ['workbox-window'] : [],
        },
        ssgOptions: {
          script: 'async',
          formatting: 'minify',
          crittersOptions: {
            reduceInlineStyles: false,
          },
        },
      }
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
  }
}
