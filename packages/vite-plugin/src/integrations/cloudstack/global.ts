import { integrationFactory } from '../_factory'

import type { CloudstackPluginContext } from '../../context'

const virtualModuleId = 'virtual:cloudstack'
const resolvedVirtualModuleId = `\0${virtualModuleId}`

export default integrationFactory((ctx: CloudstackPluginContext) => ({
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

      if (ctx.userOptions.router !== false && ctx.found('pages')) {
        imports.push(...[
          `import { ViteSSG } from 'vite-ssg'`,
          `import { routes } from 'vue-router/auto-routes'`,
        ])

        if (ctx.userOptions.layouts !== false && ctx.found('layouts')) {
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
      if (ctx.userOptions.unocss !== false && ctx.found('uno.config')) {
        imports.push(`import 'uno.css'`)
      }

      return [...imports, ...exports].join('\n')
    }
  },
}), { options: ctx => ctx })
