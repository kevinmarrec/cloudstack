import type { Plugin } from 'vite'

import { integrationFactory } from '../_factory'

import type { CloudstackPluginContext } from '../../context'

const virtualModuleId = 'virtual:cloudstack'

export default integrationFactory((ctx: CloudstackPluginContext): Plugin => {
  return {
    name: 'vite:cloudstack:global',
    resolveId(id) {
      if (id.startsWith(virtualModuleId)) {
        return id
      }
    },
    load(id) {
      if (id.startsWith(virtualModuleId)) {
        const imports: string[] = []
        const exports: string[] = []

        if (id === 'virtual:cloudstack') {
          imports.push(`import { ViteSSG } from 'vite-ssg'`)
          exports.push(`export const Power = (App, routerOptions, fn) => ViteSSG(App, { base: import.meta.env.BASE_URL, ...routerOptions }, fn)`)
        }
        else if (id === 'virtual:cloudstack/spa') {
          imports.push(`import { ViteSSG } from 'vite-ssg/single-page'`)
          exports.push(`export const Power = (App, fn) => ViteSSG(App, fn)`)
        }

        // CSS Reset
        imports.push(`import 'the-new-css-reset'`)

        // Unocss
        if (ctx.userOptions.unocss !== false && ctx.found('uno.config')) {
          imports.push(`import 'uno.css'`)
        }

        return [...imports, ...exports].join('\n')
      }
    },
  }
}, { options: ctx => ctx })
