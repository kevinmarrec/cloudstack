<script setup lang="ts">
import { useHead, useI18n } from '@frontend/composables'
import { useWelcome } from '@frontend/queries'
import { ref } from 'vue'

const { t } = useI18n()

useHead({
  title: () => t('title'),
})
const text = ref('Hello')

const { data } = useWelcome(text)
</script>

<template>
  <div class="grid h-full place-items-center">
    <div class="flex flex-col gap-4 items-center">
      <h1 class="text-4xl font-bold">
        {{ t('body.message') }}
        {{ data }}
      </h1>
      <div>
        <input v-model="text">
      </div>
    </div>
  </div>
</template>
