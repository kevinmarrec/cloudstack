/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

import { setupLayouts } from 'virtual:generated-layouts'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'

import App from './App.vue'
import { installModules } from './modules'

import 'the-new-css-reset'
import 'uno.css'

export type { UserModule } from './types'

export const createApp = ViteSSG(
  App,
  { base: import.meta.env.BASE_URL, routes: setupLayouts(routes) },
  (ctx) => {
    installModules(ctx)
  },
)
