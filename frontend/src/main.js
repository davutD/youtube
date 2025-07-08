import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Theme from '@/theme/theme'
import App from './App.vue'
import router from './router'
import '@/assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Theme,
  },
})
app.use(router)

app.mount('#app')
