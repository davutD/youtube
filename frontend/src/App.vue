<script setup>
import { useRoute } from 'vue-router'
import SidebarNarrow from './components/layout/SidebarNarrow.vue'
import TheHeader from './components/layout/TheHeader.vue'

const route = useRoute()
</script>

<template>
  <div id="app">
    <TheHeader />
    <main class="main-content">
      <SidebarNarrow v-if="route.meta.showNarrowSidebar" />
      <router-view />
    </main>
  </div>
</template>

<style scoped>
</style>