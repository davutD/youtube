import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import VideoDetailView from '../views/VideoDetailView.vue'
import AuthView from '../views/AuthView.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { showSidebar: true, showHeader: true },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: { showSidebar: true, showHeader: true },
    },
    {
      path: '/video/:id',
      name: 'video-detail',
      component: VideoDetailView,
      meta: { showSidebar: false, showHeader: true },
    },
    {
      path: '/auth',
      component: AuthView,
      meta: { showHeader: false, showSidebar: false, requiresGuest: true },
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginForm,
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterForm,
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthRoute = to.matched.some((record) => record.meta.requiresGuest)
  if (isAuthRoute && authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
