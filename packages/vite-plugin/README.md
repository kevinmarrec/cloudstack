# @kevinmarrec/cloudstack-vite-plugin

## Description

Opinionated [Vite](https://vite.dev) [plugin](https://vite.dev/guide/using-plugins).

## Opinions

- Built-in integrations (through [Vite](https://vite.dev) [plugins](https://vite.dev/guide/using-plugins)):

  - [Vue](https://vuejs.org)
  - [Vue Router](https://router.vuejs.org)
  - [Vue DevTools](https://devtools.vuejs.org)
  - [Vite PWA](https://vite-plugin-pwa.netlify.app)
  - [UnoCSS](https://unocss.dev)
  - [Bundle Visualizer](https://github.com/btd/rollup-plugin-visualizer)
  - [TypeScript config paths](https://github.com/aleclarson/vite-tsconfig-paths)

  > All integrations can be customized through options.

- [Module preload](https://vite.dev/config/build-options.html#build-modulepreload) polyfill disabled

- Browser Dark mode detection (can be toggled with [VueUse](https://vueuse.org))

- Static site generation (SSG) with [Vite SSG](https://github.com/antfu-collective/vite-ssg)

## Usage

> Requires [Vite](https://vite.dev) v6 _or later_.

```ts
// vite.config.ts
import Cloudstack from '@kevinmarrec/cloudstack-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Cloudstack({ /* options */ }),
  ],
})
```

```ts
// src/main.ts
import { Cloudstack } from 'virtual:cloudstack'

import App from './App.vue'

export const createApp = Cloudstack(App)
```
