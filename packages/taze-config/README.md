## Description

Opinionated [Taze](https://github.com/antfu-collective/taze) configuration (`taze.config.ts`).

## Usage

> Requires [Taze](https://github.com/antfu-collective/taze) v18 _or later_

### Default

```ts
// taze.config.ts
export { default } from '@kevinmarrec/cloudstack-taze-config'
```

### Extended

```ts
// taze.config.ts
import { useConfig } from '@kevinmarrec/cloudstack-taze-config'

export default useConfig({
  force: true,
})
```
