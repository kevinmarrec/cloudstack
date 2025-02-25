# @kevinmarrec/cloudstack-unocss-config

## Description

Opinionated [UnoCSS](https://unocss.dev) [configuration](https://unocss.dev/config).

## Opinions

- Uses [Cloudstack UnoCSS preset](https://github.com/kevinmarrec/cloudstack/tree/main/packages/unocss-preset#readme) by default

  - Hoists `fonts` and `icons` preset options to the configuration level

- Supports all [UnoCSS configuration](https://unocss.dev/config) options

## Usage

> Requires [UnoCSS](https://unocss.dev) v66 _or later_.

### Default

```ts
// uno.config.ts
export { default } from '@kevinmarrec/cloudstack-unocss-config'
```

### Extended

```ts
// uno.config.ts
import { useConfig } from '@kevinmarrec/cloudstack-unocss-config'

export default useConfig({ /* options */ })
```
