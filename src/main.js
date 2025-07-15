import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Impor file CSS utama yang berisi Tailwind
import './assets/main.css'

const app = createApp(App)

// Gunakan Pinia untuk state management
app.use(createPinia())
// Gunakan Vue Router untuk navigasi
app.use(router)

app.mount('#app')
