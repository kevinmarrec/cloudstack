import type { Plugin } from 'vite'

import type { CloudstackPluginContext } from '../../context'
import { integrationFactory } from '../_factory'

const virtualModuleId = 'virtual:cloudstack'

export default integrationFactory((ctx: CloudstackPluginContext): Plugin => {
  return {
    name: 'vite:cloudstack:global',
    resolveId(id) {
      if (id === virtualModuleId) {
        return id
      }
    },
    load(id) {
      if (id === virtualModuleId) {
        const imports: string[] = []
        const exports: string[] = []

        if (ctx.found('routes')) {
          imports.push(`import { ViteSSG } from 'vite-ssg'`)
          imports.push(`import { routes } from 'vue-router/auto-routes'`)
          exports.push(`export const Power = (App, fn) => ViteSSG(App, { routes }, fn)`)
        }
        else {
          imports.push(`import { ViteSSG } from 'vite-ssg/single-page'`)
          exports.push(`export const Power = (App, fn) => ViteSSG(App, fn)`)
        }

        // CSS Reset
        imports.push(`import 'the-new-css-reset'`)

        // Unocss
        if (ctx.found('uno.config.ts')) {
          imports.push(`import 'uno.css'`)
        }

        return [...imports, ...exports].join('\n')
      }
    },
  }
}, { options: ctx => ctx })
