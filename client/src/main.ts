import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import setAxiosDefaults from './util/lib/axios'

const app = createApp(App)

await setAxiosDefaults()

app.use(router)

app.mount('#app')
