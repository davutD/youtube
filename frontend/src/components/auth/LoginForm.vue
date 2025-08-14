<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth' // 1. Import your auth store
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const authStore = useAuthStore() // 2. Get an instance of the store

const email = ref('')
const password = ref('')

// 3. This function now calls the 'login' action from your store
const handleSubmit = () => {
  if (!email.value || !password.value) return
  authStore.login({ email: email.value, password: password.value })
}
</script>

<template>
  <div class="auth-form">
    <h2>Login to Your Account</h2>
    <div class="field">
      <label for="login-email">Email</label>
      <InputText id="login-email" v-model="email" type="email" />
    </div>
    <div class="field">
      <label for="login-password">Password</label>
      <InputText
        id="login-password"
        v-model="password"
        type="password"
        @keyup.enter="handleSubmit"
      />
    </div>

    <Button label="Login" @click="handleSubmit" :loading="authStore.isLoading" />

    <p>
      Don't have an account?
      <router-link to="/auth/register">Register here</router-link>
    </p>
  </div>
</template>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
a {
  color: #3ea6ff;
  cursor: pointer;
}
</style>