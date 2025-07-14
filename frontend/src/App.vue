<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/stores/store'
import TheSidebar from './components/layout/sidebar/TheSidebar.vue'
import TheHeader from './components/layout/TheHeader.vue'

const route = useRoute()
const mainStore = useMainStore()

const mainContentMargin = computed(() => {
  if (!route.meta.showSidebar) {
    return '0rem'
  }
  if (mainStore.isSidebarOpen) {
    return '5rem'
  }
  return '12rem'
})
</script>

<template>
  <div id="app">
    <TheHeader />
    <TheSidebar v-if="route.meta.showSidebar" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.main-content {
  margin-top: 6.5rem;
  margin-left: v-bind(mainContentMargin);
  padding: 1.5rem;
  transition: margin-left 0s ease-in-out;
}
</style>