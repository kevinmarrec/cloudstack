<script setup lang="ts">
import { useI18n } from '@kevinmarrec/cloudstack-vue-i18n'
import { useHead } from '@unhead/vue'
import { computed } from 'vue'

const { t } = useI18n()

useHead({
  title: computed(() => t('welcome')),
})
</script>

<template>
  <div class="grid h-full place-items-center">
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-4xl font-bold">
        Template
      </h1>
    </div>
  </div>
</template>
