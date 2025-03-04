<script setup lang="ts">
import { ref } from 'vue'

const time = ref(new Date().toLocaleTimeString())

if (!import.meta.env.SSR) {
  setInterval(() => {
    time.value = new Date().toLocaleTimeString()
  }, 1000)
}
</script>

<template>
  <div class="grid h-full place-items-center">
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-4xl font-bold">
        Template
      </h1>
      {{ time }}
    </div>
  </div>
</template>
