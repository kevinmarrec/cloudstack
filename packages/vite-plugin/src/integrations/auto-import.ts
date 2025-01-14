import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import { integrationFactory } from './_factory'

export default integrationFactory({
  key: 'autoImports',
  plugin: AutoImport,
  defaults: ({ options }) => ({
    dts: 'src/types/auto-imports.d.ts',
    dirs: ['src/composables', 'src/directives'],
    imports: options.router
      ? ['vue' as const, VueRouterAutoImports, { 'unplugin-vue-router/runtime': ['definePage'] }]
      : ['vue' as const],
    vueDirectives: {
    /* v8 ignore next */
      isDirective: normalizeImportFrom => normalizeImportFrom.includes('/directives/'),
    },
  }),
})
