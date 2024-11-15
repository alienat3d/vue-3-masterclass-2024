// [src\main.ts]
import './assets/index.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 3.0 And one more optional thing. Because the error doesn’t stop bubbling up at the App.vue comp. they can also go all the way up to the main.ts where we create our Vue instance. If we want to handle errors at his lvl we can use the following code. We won’t use such handling on the highest lvl of application in this course tho, but good to know.
/* app.config.errorHandler = error => {
  ...handle the error the way you like...
} */
