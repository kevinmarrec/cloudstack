<script setup lang="ts">
import { useHead, useI18n } from '@frontend/composables'

const { t } = useI18n()

useHead({
  title: () => t('title'),
})
</script>

<template>
  <div class="grid h-full place-items-center">
    <div class="flex flex-col gap-4 items-center">
      <h1 class="text-4xl font-bold">
        {{ t('body.message') }}
      </h1>
    </div>
  </div>
</template>
