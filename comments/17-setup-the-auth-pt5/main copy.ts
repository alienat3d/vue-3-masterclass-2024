// [src\main.ts]
import './assets/index.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 5.4 And we know for a fact that RouterView is initialized after Pinia.
// Go to [src\utils\supabaseAuth.ts]
app.use(createPinia())
app.use(router)

app.mount('#app')
