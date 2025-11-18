import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'
import router from './router'
import Toast from './modules/Toast';

const app = createApp(App)

app.use(router)

const store = createStore({
  modules: {
    toast: Toast
  }
});

app.use(store);

app.mount('#app')
