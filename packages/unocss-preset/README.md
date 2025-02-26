# @kevinmarrec/cloudstack-unocss-preset

## Description

Opinionated [UnoCSS](https://unocss.dev) [preset](https://unocss.dev/config/presets).

## Opinions

- Extends the following official presets:

  - [UnoCSS Wind preset](https://unocss.dev/presets/wind)
  - [UnoCSS Icons preset](https://unocss.dev/presets/icons)
  - [UnoCSS Web Fonts preset](https://unocss.dev/presets/web-fonts)

- Extends the following official transformers:

  - [UnoCSS Directives transformer](https://unocss.dev/transformers/directives)
  - [UnoCSS Variant group transformer](https://unocss.dev/transformers/variant-group)

- Adds a custom layer to enforce full height on top-level elements:

  ```css
  /* layer: default */
  html,
  body,
  #app {
    height: 100%;
  }
  ```

- Flattens preflight layer root to:

  ```ts
  ['*,::before,::after,::backdrop']
  ```

## Usage

> Requires [UnoCSS](https://unocss.dev) v66 _or later_.

```ts
// uno.config.ts
import preset from '@kevinmarrec/cloudstack-unocss-preset'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    preset({ /* options */ }),
  ],
})
```
