<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth' // 1. Import your auth store
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const authStore = useAuthStore() // 2. Get an instance of the store

const name = ref('')
const surname = ref('')
const email = ref('')
const password = ref('')

// 3. This function now calls the 'register' action from your store
const handleSubmit = () => {
  if (!name.value || !surname.value || !email.value || !password.value) return
  authStore.register({
    name: name.value,
    surname: surname.value,
    email: email.value,
    password: password.value,
  })
}
</script>

<template>
  <div class="auth-form">
    <h2>Create an Account</h2>
    <div class="field">
      <label for="register-name">Name</label>
      <InputText id="register-name" v-model="name" />
    </div>
    <div class="field">
      <label for="register-surname">Surname</label>
      <InputText id="register-surname" v-model="surname" />
    </div>
    <div class="field">
      <label for="register-email">Email</label>
      <InputText id="register-email" v-model="email" type="email" />
    </div>
    <div class="field">
      <label for="register-password">Password</label>
      <InputText
        id="register-password"
        v-model="password"
        type="password"
        @keyup.enter="handleSubmit"
      />
    </div>

    <Button label="Register" @click="handleSubmit" :loading="authStore.isLoading" />

    <p>
      Already have an account?
      <router-link to="/auth/login">Login here</router-link>
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