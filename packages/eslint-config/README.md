## Description

Opinionated [ESLint](https://eslint.org) configuration (`eslint.config.ts`).

## Usage

> Requires [ESLint](https://eslint.org) v9 _or later_

### Default

```ts
// eslint.config.ts
export { default } from '@kevinmarrec/cloudstack-eslint-config'
```

### Extended

```ts
// eslint.config.ts
import { useConfig } from '@kevinmarrec/cloudstack-eslint-config'

export default useConfig({
  rules: {
    'no-console': 'warn',
  },
})
```
