<script setup lang="ts">
import { useI18n } from '@kevinmarrec/cloudstack-vue-i18n'

const { t, availableLocales, locale } = useI18n()
</script>

<template>
  <div class="grid h-full place-items-center">
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-4xl font-bold">
        Template
      </h1>

      {{ t('welcome') }}
      <button v-for="x of availableLocales" :key="x" class="bg-red" @click="locale = x">
        {{ x }}
      </button>
    </div>
  </div>
</template>
