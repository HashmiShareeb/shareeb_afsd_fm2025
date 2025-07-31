// //useCustomUser.ts
// import { ref } from 'vue'
// import { provideApolloClient, useQuery } from '@vue/apollo-composable'
// import useGraphql from './useGraphql'
// import type { CustomUser } from '@/interfaces/custom.user.interface'
// import { OWN_USER_ACCOUNT } from '@/graphql/user.query'

// const customUser = ref<CustomUser>()

// const restoreCustomUser = async () => {
//   const { apolloClient } = useGraphql()
//   provideApolloClient(apolloClient)

//   return new Promise<void>(resolve => {
//     const { onResult } = useQuery(OWN_USER_ACCOUNT)
//     onResult(result => {
//       if (result.data) {
//         customUser.value = result.data.ownUseraccount as CustomUser
//         resolve()
//       }
//     })
//   })
// }

// export default () => {
//   return {
//     customUser,
//     restoreCustomUser,
//   }
// }
