<script setup>
import TheHeader from './components/layout/TheHeader.vue'
</script>

<template>
  <div id="app">
    <TheHeader />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
</style>