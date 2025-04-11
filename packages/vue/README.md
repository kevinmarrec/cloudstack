# @kevinmarrec/cloudstack-vue

## Description

Opinionated [Vue](https://vuejs.org) [Components](https://vuejs.org/guide/essentials/component-basics) & [Composition](https://vuejs.org/guide/reusability/composables.html#composables) Utilities.

## Opinions

- Export every composable from [Cloudstack Vue I18n](https://github.com/kevinmarrec/cloudstack/tree/main/packages/vue-i18n)
- Export every composable from [Cloudstack Vue PWA](https://github.com/kevinmarrec/cloudstack/tree/main/packages/vue-pwa)
- Export every composable and utility from [@unhead/vue](https://unhead.unjs.io)
- Export every composable and utility from [@vueuse/core](https://vueuse.org)
- Export every composable and utility from [vue-router](https://github.com/vuejs/router)
- Export every component from [@vueuse/components](https://vueuse.org/guide/components)

## Usage

```ts
import { useFocus } from '@kevinmarrec/cloudstack-vue'
import { OnClickOutside } from '@kevinmarrec/cloudstack-vue/components'
import { useHead } from '@kevinmarrec/cloudstack-vue/head'
import { useI18n } from '@kevinmarrec/cloudstack-vue/i18n'
import { usePWA } from '@kevinmarrec/cloudstack-vue/pwa'
import { useRouter } from '@kevinmarrec/cloudstack-vue/router'
```
