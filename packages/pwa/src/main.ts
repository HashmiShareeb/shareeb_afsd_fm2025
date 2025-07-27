import { createApp, h, provide } from 'vue'
import router from './router/index.ts'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import App from './App.vue'
import useFirebase from './composables/useFirebase'
import { DefaultApolloClient } from '@vue/apollo-composable'
import useGraphql from './composables/useGraphql.ts'

const { restoreUser } = useFirebase()

const app = createApp({
  setup() {
    const { apolloClient } = useGraphql()
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

;(async () => {
  await restoreUser()

  app.use(router)
  app.mount('#app')
})()
