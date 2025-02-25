# @kevinmarrec/cloudstack-taze-config

## Description

Opinionated [Taze](https://github.com/antfu-collective/taze) config.

## Opinions

- Enables interactive mode (`interactive: true`)

- Enables recursive bumping (`recursive: true`)

- Installs dependencies after bumping versions (`install: true`)

- Updates `package.json` files (`write: true`)

- Supports all [Taze config](https://github.com/antfu-collective/taze?tab=readme-ov-file#config-file) options

## Usage

> Requires [Taze](https://github.com/antfu-collective/taze) v18 _or later_.

### Default

```ts
// taze.config.ts
export { default } from '@kevinmarrec/cloudstack-taze-config'
```

### Extended

```ts
// taze.config.ts
import { useConfig } from '@kevinmarrec/cloudstack-taze-config'

export default useConfig({ /* options */ })
```
