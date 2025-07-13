<script setup lang="ts">
import { useHead, useI18n } from '@frontend/composables'
import { useSignUp } from '@frontend/queries'

const { t } = useI18n()

useHead({
  title: () => t('title'),
})

const { mutate: signUp, isPending, isError, error } = useSignUp()
</script>

<template>
  <div class="grid h-full place-items-center">
    <div class="flex flex-col gap-4 items-center">
      <h1 class="text-4xl font-bold">
        {{ t('body.message') }}
      </h1>
      <button :disabled="isPending" @click="signUp">
        {{ isPending ? 'Signing up...' : 'Sign Up' }}
      </button>
      <p v-if="isError" class="text-red-500">
        {{ error }}
      </p>
    </div>
  </div>
</template>
