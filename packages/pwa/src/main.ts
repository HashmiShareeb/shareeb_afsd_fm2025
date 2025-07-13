import { createApp, type App as VueApp } from 'vue'
import router from './router/index.ts'
//import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import App from './App.vue'

const app: VueApp = createApp(App)

app.use(router)

app.mount('#app')
