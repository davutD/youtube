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
      meta: { showNarrowSidebar: true },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: { showNarrowSidebar: true },
    },
    {
      path: '/video/:id',
      name: 'video-detail',
      component: VideoDetailView,
    },
  ],
})

export default router
