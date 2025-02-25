# @kevinmarrec/cloudstack-knip-config

## Description

Opinionated [Knip](https://knip.dev) config.

## Opinions

- Disables [Stylelint plugin](https://knip.dev/reference/plugins/stylelint) to prevent false positives

- Provides default root entries when using workspaces: `*.config.ts`

- Supports all [Knip config](https://knip.dev/reference/configuration) options

## Usage

> Requires [Knip](https://knip.dev) v5 _or later_.

### Default

```ts
// knip.config.ts
export { default } from '@kevinmarrec/cloudstack-knip-config'
```

### Extended

```ts
// knip.config.ts
import { useConfig } from '@kevinmarrec/cloudstack-knip-config'

export default useConfig({ /* options */ })
```
