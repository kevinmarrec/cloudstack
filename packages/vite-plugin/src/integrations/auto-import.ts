import { isPackageExists } from 'local-pkg'
import { globSync } from 'tinyglobby'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import { integrationFactory } from './_factory'

export default integrationFactory(AutoImport, {
  enabled: ctx => ctx.userOptions.autoImports !== false,
  options: ctx => ctx.userOptions.autoImports,
  defaults: ctx => ({
    dts: 'src/types/auto-imports.d.ts',
    dirs: ['src/composables', 'src/directives'],
    imports: ctx.userOptions.router !== false && ctx.found('pages')
      ? ['vue' as const, VueRouterAutoImports, { 'unplugin-vue-router/runtime': ['definePage'] }]
      : ['vue' as const],
    vueDirectives: {
      /* v8 ignore next */
      isDirective: normalizeImportFrom => normalizeImportFrom.includes('/directives/'),
    },
  }),
})
