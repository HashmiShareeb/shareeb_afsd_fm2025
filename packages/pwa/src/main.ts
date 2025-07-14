import { createApp, type App as VueApp } from 'vue'
import router from './router/index.ts'
//import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import App from './App.vue'
import useFirebase from './composables/useFirebase'

const { restoreUser } = useFirebase()

const app: VueApp = createApp(App)
;(async () => {
  await restoreUser()

  app.use(router)
  app.mount('#app')
})()
