import type { Router, RouterClient } from '@backend/router'
import { orpc } from '@frontend/lib/orpc'
import { useQuery } from '@tanstack/vue-query'
import { computed, type MaybeRef, unref } from 'vue'

export function useWelcome(text: MaybeRef<string>) {
  return useQuery(computed(() => orpc.welcome.queryOptions({
    input: unref(text),
  })))
}
