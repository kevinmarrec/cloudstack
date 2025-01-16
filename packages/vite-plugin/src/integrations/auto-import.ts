import defu from 'defu'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import { integrationFactory } from './_factory'

export default integrationFactory(
  AutoImport,
  ctx => ctx.options.autoImports,
  ctx => ({
    dts: 'src/types/auto-imports.d.ts',
    dirs: ['src/composables', 'src/directives'],
    imports: ctx.options.router
      ? ['vue' as const, VueRouterAutoImports, { 'unplugin-vue-router/runtime': ['definePage'] }]
      : ['vue' as const],
    vueDirectives: {
      /* v8 ignore next */
      isDirective: normalizeImportFrom => normalizeImportFrom.includes('/directives/'),
    },
  }),
)
