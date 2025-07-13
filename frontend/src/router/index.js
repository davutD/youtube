import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import VideoDetailView from '../views/VideoDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { showSidebar: true },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: { showSidebar: true },
    },
    {
      path: '/video/:id',
      name: 'video-detail',
      component: VideoDetailView,
    },
  ],
})

export default router
