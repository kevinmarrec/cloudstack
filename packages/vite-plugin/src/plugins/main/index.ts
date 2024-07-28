/// <reference types="vite-ssg" />

import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import type { Plugin, ResolvedConfig } from 'vite'

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
        const imports: string[] = []
        const exports: string[] = []

        if (ctx.options.router) {
          imports.push(...[
            `import { ViteSSG } from 'vite-ssg'`,
            `import { routes } from 'vue-router/auto-routes'`,
          ])

          if (ctx.options.layouts) {
            imports.push(`import { setupLayouts } from 'virtual:generated-layouts'`)
            exports.push(`export const Power = (App, fn) => ViteSSG(App, { base: import.meta.env.BASE_URL, routes: setupLayouts(routes) }, fn)`)
          }
          else {
            exports.push(`export const Power = (App, fn) => ViteSSG(App, { base: import.meta.env.BASE_URL, routes }, fn)`)
          }
        }
        else {
          imports.push(`import { ViteSSG } from 'vite-ssg/single-page'`)
          exports.push(`export const Power = (App, fn) => ViteSSG(App, fn)`)
        }

        if (ctx.options.unocss) {
          imports.push(...[
            `import 'the-new-css-reset'`,
            `import 'uno.css'`,
          ])
        }

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
