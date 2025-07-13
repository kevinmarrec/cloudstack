import { orpc } from '@frontend/lib/orpc'
import { useMutation } from '@tanstack/vue-query'
import { computed } from 'vue'

export function useSignUp() {
  return useMutation(computed(() => orpc.auth.signUp.mutationOptions()))
}
