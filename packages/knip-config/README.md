## Description

Opinionated [Knip](https://knip.dev) configuration (`knip.config.ts`).

## Usage

> Requires [Knip](https://knip.dev) v5 _or later_

### Default

```ts
// knip.config.ts
export { default } from '@kevinmarrec/cloudstack-knip-config'
```

### Extended

```ts
// knip.config.ts
import { useConfig } from '@kevinmarrec/cloudstack-knip-config'

export default useConfig({
  workspaces: {
    frontend: {
      entry: [
        'src/main.ts',
        'src/pages/**/*.vue',
      ],
    },
  },
})
```
