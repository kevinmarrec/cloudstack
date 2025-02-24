## Description

Opinionated [Stylelint](https://stylelint.io) configuration (`stylelint.config.ts`).

## Usage

> Requires [Stylelint](https://stylelint.io) v16 _or later_

### Default

```ts
// stylelint.config.ts
export { default } from '@kevinmarrec/cloudstack-stylelint-config'
```

### Extended

```ts
// stylelint.config.ts
import { useConfig } from '@kevinmarrec/cloudstack-stylelint-config'

export default useConfig({
  rules: {
    'block-no-empty': false,
  },
})
```
