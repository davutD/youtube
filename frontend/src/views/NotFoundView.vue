<script setup>
import Button from 'primevue/button'
</script>

<template>
  <div class="not-found-container">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>Sorry, the page you are looking for does not exist.</p>
    <router-link to="/">
      <Button label="Go to Homepage" icon="pi pi-home" />
    </router-link>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 60vh;
}

h1 {
  font-size: 6rem;
  margin: 0;
}

h2 {
  font-size: 2rem;
  margin: 0 0 1rem 0;
}
</style>