/// <reference types="vite-ssg" />

import type { Plugin } from 'vite'

import { integrationFactory } from './_factory'

import type { CloudstackPluginContext } from '../context'

const virtualModuleId = 'virtual:cloudstack'
const resolvedVirtualModuleId = `\0${virtualModuleId}`

export default integrationFactory((ctx: CloudstackPluginContext): Plugin[] => {
  return [
    {
      name: 'vite:cloudstack:global',
      resolveId(id) {
        if (id === virtualModuleId) {
          return resolvedVirtualModuleId
        }
      },
      load(id) {
        if (id === resolvedVirtualModuleId) {
          const imports: string[] = []
          const exports: string[] = []

          if (ctx.userOptions.router) {
            imports.push(...[
              `import { ViteSSG } from 'vite-ssg'`,
              `import { routes } from 'vue-router/auto-routes'`,
            ])

            if (ctx.userOptions.layouts) {
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

          // CSS Reset
          imports.push(`import 'the-new-css-reset'`)

          // Unocss
          if (ctx.userOptions.unocss) {
            imports.push(`import 'uno.css'`)
          }

          return [...imports, ...exports].join('\n')
        }
      },
    },
    {
      name: 'vite:cloudstack:config',
      config() {
        return {
          optimizeDeps: {
            include: ctx.userOptions.pwa
              ? ['vite-ssg', 'workbox-window']
              : ['vite-ssg'],
          },
          ssgOptions: {
            script: 'async',
            formatting: 'minify',
            beastiesOptions: {
              reduceInlineStyles: false,
            },
          },
        }
      },
    },
    {
      name: 'vite:cloudstack:dark-mode',
      transformIndexHtml(html) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              injectTo: 'head',
              children: `\
(function () {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const setting = localStorage.getItem('vueuse-color-scheme') || 'auto'
  if (setting === 'dark' || (prefersDark && setting !== 'light'))
    document.documentElement.classList.toggle('dark', true)
})()`,
            },
          ],
        }
      },
    },
  ]
})
