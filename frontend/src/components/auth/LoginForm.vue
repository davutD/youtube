<script setup>
import { useAuthStore } from '@/stores/auth'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const authStore = useAuthStore()

const validationSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .min(2, 'Email must be at least 2 characters')
    .max(50, 'Email cannot exceed 50 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
})

const { handleSubmit } = useForm({
  validationSchema,
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const onSubmit = handleSubmit((values) => {
  authStore.login(values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="auth-form">
    <h2>Login to Your Account</h2>

    <div class="field">
      <label for="login-email">Email</label>
      <InputText id="login-email" v-model="email" type="email" />
      <small class="error-message" v-if="emailError">{{ emailError }}</small>
    </div>

    <div class="field">
      <label for="login-password">Password</label>
      <InputText id="login-password" v-model="password" type="password" />
      <small class="error-message" v-if="passwordError">{{ passwordError }}</small>
    </div>

    <Button type="submit" label="Login" :loading="authStore.isLoading" />

    <p>
      Don't have an account?
      <router-link to="/auth/register">Register here</router-link>
    </p>
  </form>
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
.error-message {
  color: red;
  font-size: 0.8rem;
}
a {
  color: #3ea6ff;
  cursor: pointer;
}
</style>