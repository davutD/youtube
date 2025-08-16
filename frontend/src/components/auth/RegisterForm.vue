<script setup>
import { useAuthStore } from '@/stores/auth'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const authStore = useAuthStore()

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  surname: yup
    .string()
    .required('Surname is required')
    .min(2, 'Surname must be at least 2 characters')
    .max(50, 'Surname must be at most 50 characters'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Must contain an uppercase, lowercase, number, and special character.'
    ),
  passwordConfirm: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

const { handleSubmit } = useForm({ validationSchema })

const { value: name, errorMessage: nameError } = useField('name')
const { value: surname, errorMessage: surnameError } = useField('surname')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: passwordConfirm, errorMessage: passwordConfirmError } = useField('passwordConfirm')

const onSubmit = handleSubmit((values) => {
  authStore.register(values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="auth-form">
    <h2>Create an Account</h2>

    <div class="field">
      <label for="register-name">Name</label>
      <InputText id="register-name" v-model="name" />
      <small class="error-message" v-if="nameError">{{ nameError }}</small>
    </div>
    <div class="field">
      <label for="register-surname">Surname</label>
      <InputText id="register-surname" v-model="surname" />
      <small class="error-message" v-if="surnameError">{{ surnameError }}</small>
    </div>
    <div class="field">
      <label for="register-email">Email</label>
      <InputText id="register-email" v-model="email" type="email" />
      <small class="error-message" v-if="emailError">{{ emailError }}</small>
    </div>

    <div class="field">
      <label for="register-password">Password</label>
      <InputText id="register-password" v-model="password" type="password" />
      <small class="error-message" v-if="passwordError">{{ passwordError }}</small>
    </div>

    <div class="field">
      <label for="register-password-confirm">Confirm Password</label>
      <InputText id="register-password-confirm" v-model="passwordConfirm" type="password" />
      <small class="error-message" v-if="passwordConfirmError">{{ passwordConfirmError }}</small>
    </div>

    <Button type="submit" label="Register" :loading="authStore.isLoading" />

    <p>
      Already have an account?
      <router-link to="/auth/login">Login here</router-link>
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