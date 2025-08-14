import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoading = ref(false)
  const authError = ref(null)
  const isAuthenticated = computed(() => !!user.value)

  async function checkAuthStatus() {
    try {
      const response = await apiClient.get('/auth/me')
      user.value = response.data.user
    } catch (error) {
      user.value = null
    }
  }

  async function login(credentials) {
    isLoading.value = true
    authError.value = null
    try {
      const response = await apiClient.post('/auth/login', credentials)
      user.value = response.data
      router.push('/')
    } catch (error) {
      authError.value = error.response?.data?.message || 'Login failed. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  async function register(details) {
    isLoading.value = true
    authError.value = null
    try {
      await apiClient.post('/auth/register', details)
      await login({ email: details.email, password: details.password })
    } catch (error) {
      authError.value = error.response?.data?.message || 'Registration failed. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    isLoading.value = true
    try {
      await apiClient.post('/auth/logout')
      user.value = null
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    authError,
    isAuthenticated,
    checkAuthStatus,
    login,
    register,
    logout,
  }
})
