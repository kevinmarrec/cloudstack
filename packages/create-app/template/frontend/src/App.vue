<script setup lang="ts">
import { useHead } from '@kevinmarrec/cloudstack-vue/head'
import { useI18n } from '@kevinmarrec/cloudstack-vue/i18n'
import { computed } from 'vue'

const { t } = useI18n()

useHead({
  title: computed(() => t('title')),
})
</script>

<template>
  <div class="grid h-full place-items-center">
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-4xl font-bold">
        {{ t('body.message') }}
      </h1>
    </div>
  </div>
</template>
