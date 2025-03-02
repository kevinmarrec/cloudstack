<script setup lang="ts">
import { useI18n } from '@kevinmarrec/cloudstack-vue-i18n'
import { ref } from 'vue'

const { t, setLocaleMessage } = useI18n()

const time = ref(new Date().toLocaleTimeString())

setInterval(() => {
  time.value = new Date().toLocaleTimeString()
}, 1000)
</script>

<template>
  <div class="grid h-full place-items-center">
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-4xl font-bold">
        Template
      </h1>
      {{ t('welcome') }}
      <button @click="setLocaleMessage('en', { welcome: 'what a save' })">
        English
      </button>
    </div>
  </div>
</template>
