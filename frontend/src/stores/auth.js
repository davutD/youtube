import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

import { useMainStore } from './store'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

export const useAuthStore = defineStore('auth', () => {
  const mainStore = useMainStore()

  const user = ref(null)
  const publicProfile = ref(null)
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

  async function fetchUserById(userId) {
    publicProfile.value = null
    try {
      const response = await apiClient.get(`/users/${userId}`)
      publicProfile.value = response.data
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    }
  }

  async function subscribe(channelId) {
    if (!isAuthenticated.value) {
      router.push('/auth/login')
      return
    }
    try {
      await apiClient.post(`/users/subscribers/${channelId}`)
      if (publicProfile.value?._id === channelId) {
        publicProfile.value.subscribers.push(user.value._id)
        publicProfile.value.subscriberCount++
      }
      if (mainStore.selectedVideoState.data?.creator._id === channelId) {
        mainStore.selectedVideoState.data.creator.subscribers.push(user.value._id)
        mainStore.selectedVideoState.data.creator.subscriberCount++
      }
    } catch (error) {
      console.error('Failed to subscribe:', error)
    }
  }

  async function unsubscribe(channelId) {
    if (!isAuthenticated.value) return
    try {
      await apiClient.delete(`/users/subscribers/${channelId}`)
      if (publicProfile.value?._id === channelId) {
        publicProfile.value.subscribers = publicProfile.value.subscribers.filter(
          (id) => id !== user.value._id,
        )
        publicProfile.value.subscriberCount--
      }
      if (mainStore.selectedVideoState.data?.creator._id === channelId) {
        mainStore.selectedVideoState.data.creator.subscribers =
          mainStore.selectedVideoState.data.creator.subscribers.filter(
            (id) => id !== user.value._id,
          )
        mainStore.selectedVideoState.data.creator.subscriberCount--
      }
    } catch (error) {
      console.error('Failed to unsubscribe:', error)
    }
  }

  async function likeVideo(video) {
    if (!isAuthenticated.value) {
      router.push('/auth/login')
      return
    }
    try {
      const response = await apiClient.post(`/users/likesVideo/${video._id}`)
      if (mainStore.selectedVideoState.data) {
        mainStore.selectedVideoState.data = response.data
      }
    } catch (error) {
      console.error('Failed to like video:', error)
    }
  }

  async function dislikeVideo(video) {
    if (!isAuthenticated.value) {
      router.push('/auth/login')
      return
    }
    try {
      const response = await apiClient.delete(`/users/likesVideo/${video._id}`)
      if (mainStore.selectedVideoState.data) {
        mainStore.selectedVideoState.data = response.data
      }
    } catch (error) {
      console.error('Failed to dislike video:', error)
    }
  }

  return {
    user,
    publicProfile,
    isLoading,
    authError,
    isAuthenticated,
    checkAuthStatus,
    login,
    register,
    logout,
    fetchUserById,
    subscribe,
    unsubscribe,
    likeVideo,
    dislikeVideo,
  }
})
