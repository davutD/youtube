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
  padding-top: 6.5rem;
}

.main-content {
  flex-grow: 1;
  padding: 1.5rem;
  padding-left: v-bind(mainContentPadding);
  transition: padding-left 0.2s ease-in-out;
}
</style>