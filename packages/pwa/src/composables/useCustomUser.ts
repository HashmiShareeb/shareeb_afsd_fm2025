import { ref, computed } from 'vue'
import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import useGraphql from './useGraphql'
import useFirebase from './useFirebase'
import type { CustomUser } from '@/interfaces/custom.user.interface'
import { OWN_USER_ACCOUNT } from '@/graphql/user.query'

const customUser = ref<CustomUser | null>(null)

const restoreCustomUser = async () => {
  const { apolloClient } = useGraphql()
  provideApolloClient(apolloClient)

  const { firebaseUser } = useFirebase()
  if (!firebaseUser.value?.uid) {
    console.error('No Firebase user UID available')
    return
  }

  const variables = { uid: firebaseUser.value.uid }
  const { onResult, onError } = useQuery(OWN_USER_ACCOUNT, variables, {
    fetchPolicy: 'network-only',
  })
  //   const { result, loading, error, onResult, onError } = useQuery(
  //     OWN_USER_ACCOUNT,
  //     variables,
  //     {
  //       fetchPolicy: 'network-only',
  //     },
  //   )

  return new Promise<void>((resolve, reject) => {
    onResult(result => {
      if (result.data?.userByUid) {
        customUser.value = result.data.userByUid as CustomUser
        console.log('Custom user fetched:', customUser.value)
        resolve()
      }
    })
    onError(err => {
      console.error('Error fetching custom user:', err)
      customUser.value = null
      reject(err)
    })
  })
}

const userRole = computed(() => {
  const role = customUser.value?.role || null
  return role ? role.toUpperCase() : null
})

// fetch user id (mongodb)
const userId = computed(() => customUser.value?.id || null)

export default () => {
  return {
    customUser,
    userRole,
    userId,
    restoreCustomUser,
  }
}
