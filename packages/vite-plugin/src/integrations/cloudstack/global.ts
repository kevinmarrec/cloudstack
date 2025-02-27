import type { Plugin } from 'vite'

import type { CloudstackPluginContext } from '../../context'
import { integrationFactory } from '../_factory'
import unocss from '../unocss'
import vueRouter from '../vue-router'

const virtualModuleId = 'virtual:cloudstack'

export default integrationFactory((ctx: CloudstackPluginContext): Plugin => ({
  name: 'cloudstack:global',
  resolveId(id) {
    if (id === virtualModuleId) {
      return id
    }
  },
  load(id) {
    if (id === virtualModuleId) {
      const hasRouter = vueRouter.enabled(ctx)
      const imports: string[] = []
      const exports: string[] = []

      if (hasRouter) {
        imports.push(`import { ViteSSG } from 'vite-ssg'`)
        imports.push(`import { routes } from 'vue-router/auto-routes'`)
      }
      else {
        imports.push(`import { ViteSSG } from 'vite-ssg/single-page'`)
      }

      exports.push(`export const Cloudstack = (App, ...args) => \
        typeof args[0] === 'object' \
          ? ViteSSG(App, ${hasRouter ? '{ routes, ...args[0] }, args[1]' : 'args[1]'}) \
          : ViteSSG(App, ${hasRouter ? '{ routes }, args[0]' : 'args[0]'})
      `.replace(/\s+/g, ' ').trim())

      // CSS Reset
      imports.push(`import 'the-new-css-reset'`)

      // Unocss
      if (unocss.enabled(ctx)) {
        imports.push(`import 'uno.css'`)
      }

      return [...imports, ...exports].join('\n')
    }
  },
}), { options: ctx => ctx })
