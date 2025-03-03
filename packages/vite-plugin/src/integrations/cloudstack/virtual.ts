import type { Plugin } from 'vite'

import type { CloudstackPluginContext } from '../../context'
import { integrationFactory } from '../_factory'
import unocss from '../unocss'
import vueRouter from '../vue-router'

const virtualModuleId = 'virtual:cloudstack'

export default integrationFactory((ctx: CloudstackPluginContext): Plugin => ({
  name: 'cloudstack:virtual',
  resolveId(id) {
    if (id === virtualModuleId) {
      return id
    }
  },
  load(id) {
    if (id === virtualModuleId) {
      const imports: string[] = []
      const exports: string[] = []
      const hasRouter = vueRouter.enabled(ctx)

      if (hasRouter) {
        imports.push(`import { ViteSSG } from 'vite-ssg'`)
        imports.push(`import { routes } from 'vue-router/auto-routes'`)
      }
      else {
        imports.push(`import { ViteSSG } from 'vite-ssg/single-page'`)
      }

      exports.push(`export const Cloudstack = (App, argA, argB) => \
        typeof argA === 'object' \
          ? ViteSSG(App, ${hasRouter ? '{ routes, ...argA }, argB' : 'argB'}) \
          : ViteSSG(App, ${hasRouter ? '{ routes }, argA' : 'argA'})
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
