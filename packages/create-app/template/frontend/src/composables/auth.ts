import { orpc } from '@frontend/lib/orpc'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export function useAuth() {
  const { setQueryData, invalidateQueries } = useQueryClient()

  const { data: session } = useQuery(orpc.auth.getSession.queryOptions())

  const { mutateAsync: signUp } = useMutation(orpc.auth.signUp.mutationOptions({
    onSuccess: () => invalidateQueries({ queryKey: orpc.auth.getSession.queryKey() }),
  }))

  const { mutateAsync: signIn } = useMutation(orpc.auth.signIn.mutationOptions({
    onSuccess: () => invalidateQueries({ queryKey: orpc.auth.getSession.queryKey() }),
  }))

  const { mutateAsync: signOut } = useMutation(orpc.auth.signOut.mutationOptions({
    onSuccess: () => {
      setQueryData(orpc.auth.getSession.queryKey(), null)
    },
  }))

  return {
    session,
    signUp,
    signIn,
    signOut,
  }
}
