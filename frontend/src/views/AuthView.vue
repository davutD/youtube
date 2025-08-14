<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="auth-container">
    <p v-if="authStore.authError" class="error-message">
      {{ authStore.authError }}
    </p>

    <router-view />
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 450px;
  margin: 3rem auto;
  padding: 2rem;
  border: 1px solid #373737;
  border-radius: 8px;
}
.error-message {
  color: red;
  margin-bottom: 1rem;
  text-align: center;
}
</style>