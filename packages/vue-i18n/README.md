# @kevinmarrec/cloudstack-vue-i18n

## Description

Opinionated [Internationalization (i18n)](https://developer.mozilla.org/en-US/docs/Glossary/Internationalization) [Vue](https://vuejs.org) [plugin](https://vuejs.org/guide/reusability/plugins).

## Opinions

- Lazy loading of locales

  - Supports JSON
  - Supports YAML (with optional requirement: [vite-plugin-yaml](https://github.com/Modyfi/vite-plugin-yaml))

- Fallbacking

  - Configure which locale to use when your preferred language lacks a translation
  - If the fallback locale also lacks the translation, the key will be returned as is

- Message Format features

  - Standard & nested keys

    - `t('foo')` resolves `foo`
    - `t('foo.bar')` resolves `foo` ➡️ `bar`
    - `t('foo.bar.baz')` resolves `foo` ➡️ `bar` ➡️ `baz`

  - Named interpolation

    - `Hello {name}` + `t('key', { name: 'John' })` = `Hello John`

  - List interpolation

    - `Hello {0} {1}` + `t('key', ['John', 'Doe'])` = `Hello John Doe`

  - Pluralization

    - `car | cars` + `t('key', 0)` = `cars`
    - `car | cars` + `t('key', 1)` = `car`
    - `car | cars` + `t('key', 2)` = `cars`
    - `no apples | one apple | {count} apples` + `t('key', 0)` = `no apples`
    - `no apples | one apple | {count} apples` + `t('key', 1)` = `one apple`
    - `no apples | one apple | {count} apples` + `t('key', 2)` = `2 apples`

- Supports Server-Side Rendering (SSR) & Static Site Generation (SSG)

## Usage

> This package is mainly meant to be internally used by [Cloudstack Vite](https://github.com/kevinmarrec/cloudstack/tree/main/packages/vite-plugin).
>
> The `createI18n` function returns a `Promise` that resolves to the i18n plugin, so you must asynchronously use it in your app.
>
> This is required to ensure the following behaviors:
>
> - Client-side rendering (CSR) _lazy_ loads the base & fallback locales **when** rendering the app.
> - Server-side rendering (SSR) loads the base & fallback locales **before** rendering the app.

```vue
<script setup lang="ts">
import { useI18n } from '@kevinmarrec/cloudstack-vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>{{ t('welcome') }}</div>
</template>
```
