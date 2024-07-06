/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

import { setupLayouts } from 'virtual:generated-layouts'
import type { ViteSSGContext } from 'vite-ssg'
import { ViteSSG } from 'vite-ssg'
import type { Component } from 'vue'
import { routes } from 'vue-router/auto-routes'

import { installModules } from './modules'

import 'uno.css'

export type { UserModule } from './types'

export function makeApp(rootComponent: Component, fn?: (ctx: ViteSSGContext) => void) {
  return ViteSSG(
    rootComponent,
    { base: import.meta.env.BASE_URL, routes: setupLayouts(routes) },
    (ctx) => {
      installModules(ctx)
      fn?.(ctx)
    },
  )
}
