<script setup lang="ts">
import { useI18n } from '@kevinmarrec/cloudstack-vue-i18n'
import { useHead } from '@unhead/vue'

const { t, availableLocales, locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale,
  },
})
</script>

<template>
  <div class="grid h-full place-items-center">
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-4xl font-bold">
        {{ t('welcome') }}
      </h1>

      <button v-for="x of availableLocales" :key="x" class="bg-red" @click="locale = x">
        {{ x }}
      </button>
    </div>
  </div>
</template>
