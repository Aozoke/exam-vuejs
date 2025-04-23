import './assets/main.css'
import './assets/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'  // Assure-toi que le chemin est correct ici


const app = createApp(App)

app.use(createPinia())
app.use(router)  // Utiliser le router dans l'application

app.mount('#app')
