## Description

Opinionated [UnoCSS](https://unocss.dev) configuration (`uno.config.ts`).

## Usage

> Requires [UnoCSS](https://unocss.dev) v66 _or later_

### Default

```ts
// uno.config.ts
export { default } from '@kevinmarrec/cloudstack-unocss-config'
```

### Extended

```ts
// uno.config.ts
import { useConfig } from '@kevinmarrec/cloudstack-unocss-config'

export default useConfig({
  safelist: ['text-red', 'text-green', 'text-blue'],
})
```
