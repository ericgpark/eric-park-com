import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'
import router from './router'
import setAxiosDefaults from './util/lib/axios'
import Flickr from '@/modules/Flickr';
import Toast from './modules/Toast';

const app = createApp(App)

await setAxiosDefaults()

app.use(router)

const store = createStore({
  modules: {
    photos: Flickr,
    toast: Toast
  }
});

app.use(store);

app.mount('#app')
