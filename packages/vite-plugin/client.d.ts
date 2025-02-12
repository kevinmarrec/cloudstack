/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

declare module 'virtual:cloudstack' {
  import type { ViteSSGContext, RouterOptions as ViteSSGRouterOptions } from 'vite-ssg'
  import type { Component } from 'vue'

  type RouterOptions = Omit<ViteSSGRouterOptions, 'routes'>

  function Cloudstack(component: Component, fn?: (context: ViteSSGContext<false>) => Promise<void> | void): () => ViteSSGContext<false>
  function Cloudstack(component: Component, routerOptions: RouterOptions, fn?: (context: ViteSSGContext<true>) => Promise<void> | void): () => ViteSSGContext<true>

  export { Cloudstack }
}
