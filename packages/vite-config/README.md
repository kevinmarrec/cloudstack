# @kevinmarrec/cloudstack-vite-config

## Description

Opinionated [Vite](https://vite.dev) [config](https://vite.dev/config).

## Opinions

- Uses [Cloudstack Vite plugin](https://github.com/kevinmarrec/cloudstack/tree/main/packages/vite-plugin#readme) by default
  - Hoists plugin options to the `cloudstack` config key

- Supports all [Vite config](https://vite.dev/config) options

## Usage

> Requires [Vite](https://vite.dev) v6 _or later_.

### Default

```ts
// vite.config.ts
export { default } from '@kevinmarrec/cloudstack-vite-config'
```

### Extended

```ts
// vite.config.ts
import { useConfig } from '@kevinmarrec/cloudstack-vite-config'

export default useConfig({ /* options */ })
```
