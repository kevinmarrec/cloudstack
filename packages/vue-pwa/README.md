# @kevinmarrec/cloudstack-vue-pwa

## Description

Opinionated [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) [Vue](https://vuejs.org) integration.

## Usage

> This package is mainly meant to be internally used by [Cloudstack Vite](https://github.com/kevinmarrec/cloudstack/tree/main/packages/vite-plugin).

```vue
<script setup lang="ts">
import { usePWA } from '@kevinmarrec/cloudstack-vue-pwa'

const {
  needRefresh,
  offlineReady,
  register, // not needed if you use Cloudstack Vite, it will be called automatically
  updateServiceWorker,
} = usePWA()
</script>
```
