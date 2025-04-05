import { globSync } from 'tinyglobby'
import type { Plugin } from 'vite'

import type { CloudstackPluginContext } from '../../context'
import { integrationFactory } from '../_factory'
import pwa from '../pwa'
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
      const { localesFolder = 'src/locales', locale, fallbackLocale } = ctx.userOptions.i18n ?? {}
      const imports: string[] = []
      const exports: string[] = []
      const hasRouter = vueRouter.enabled(ctx)
      const hasLocales = globSync(`${localesFolder}/*.{json,yaml,yml}`).length > 0
      const isPWA = pwa.enabled(ctx)
      let inject = ''

      // Router
      if (hasRouter) {
        imports.push(`import { ViteSSG } from 'vite-ssg'`)
        imports.push(`import { routes } from 'vue-router/auto-routes'`)
      }
      else {
        imports.push(`import { ViteSSG } from 'vite-ssg/single-page'`)
      }

      // I18n
      if (hasLocales) {
        imports.push(`import { createI18n } from '@kevinmarrec/cloudstack-vue-i18n'`)
        inject += `
          ctx.app.use(await createI18n({
            ${locale ? `locale: '${locale}',` : ''}
            ${fallbackLocale ? `fallbackLocale: '${fallbackLocale}',` : ''}
            messages: import.meta.glob('/${localesFolder}/*.{json,yaml,yml}')
          }))
        `
      }

      // PWA
      if (isPWA) {
        imports.push(`import { usePWA } from '@kevinmarrec/cloudstack-vue-pwa'`)
        inject += `
          usePWA().register()
        `
      }

      exports.push(`
        const fn = (innerFn) => async (ctx) => {
          ${inject}
          innerFn?.(ctx)
        }
      `)

      exports.push(`
        export const Cloudstack = (App, argA, argB) =>
          typeof argA === 'object'
            ? ViteSSG(App, ${hasRouter ? '{ routes, ...argA }, fn(argB)' : 'fn(argB)'})
            : ViteSSG(App, ${hasRouter ? '{ routes }, fn(argA)' : 'fn(argA)'})
      `)

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
