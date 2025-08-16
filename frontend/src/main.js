import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import Theme from '@/theme/theme'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import '@/assets/main.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(PrimeVue, {
  theme: {
    preset: Theme,
  },
})
app.use(ConfirmationService)

async function initializeApp() {
  const authStore = useAuthStore()
  await authStore.checkAuthStatus()
  app.use(router)
  app.mount('#app')
}

initializeApp()
