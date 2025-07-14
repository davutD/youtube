<script setup>
import { useRoute } from 'vue-router'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheHeader from './components/layout/TheHeader.vue'

const route = useRoute()
</script>

<template>
  <div id="app">
    <TheHeader />
    <TheSidebar v-if="route.meta.showSidebar" />
    <div class="main-container">
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  margin-top: 6.5rem;
}

.main-content {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
  transition: all 0.2s ease-in-out;
}
</style>