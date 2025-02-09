import { globSync } from 'tinyglobby'
import VueRouter from 'unplugin-vue-router/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(VueRouter, {
  enabled: ({ userOptions }) => {
    let { routesFolder = 'src/pages' } = userOptions.vueRouter ?? {}
    routesFolder = (Array.isArray(routesFolder) ? routesFolder : [routesFolder])
    const sources = routesFolder.map(x => typeof x === 'string' ? x : x.src)
    return globSync(sources.map(src => `${src}/**/*.vue`)).length > 0
  },
  options: ({ userOptions }) => userOptions.vueRouter,
  defaults: () => ({
    dts: 'src/types/router.d.ts',
  }),
})
