<script setup>
import { useRoute } from 'vue-router'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheHeader from './components/layout/TheHeader.vue'

const route = useRoute()
</script>

<template>
  <div id="app">
    <TheHeader />
    <div class="main-container">
      <TheSidebar v-if="route.meta.showSidebar" />
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
  /* padding-top: 6.5rem; */
  border: 1px solid #d60f0f;
}

.main-content {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
  transition: all 0.2s ease-in-out;
}
</style>