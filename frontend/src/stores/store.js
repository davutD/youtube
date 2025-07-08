import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const isSidebarOpen = ref(true)
  const videos = ref([])
  const selectedVideo = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // --- Getters ---
  // Getters would be defined here using computed().
  //   const videoCount = computed(() => videos.value.length)
  //   const isReady = computed(() => !isLoading.value && error.value === null)

  // --- Actions ---
  // Actions would be defined here as functions.
  //   function toggleSidebar() {
  //     isSidebarOpen.value = !isSidebarOpen.value
  //   }

  //   function selectVideo(video) {
  //     selectedVideo.value = video
  //   }

  //   async function fetchVideos() {
  //     isLoading.value = true
  //     error.value = null
  //     try {
  //       // Simulate an API call
  //       await new Promise((resolve) => setTimeout(resolve, 1000))

  //       const mockVideos = [
  //         { id: 'v1', title: 'First Vue Video' },
  //         { id: 'v2', title: 'Learning Pinia Setup Stores' },
  //         { id: 'v3', title: 'PrimeVue Still Rocks!' },
  //       ]

  //       videos.value = mockVideos
  //     } catch (e) {
  //       error.value = 'Failed to fetch videos.'
  //       videos.value = []
  //     } finally {
  //       isLoading.value = false
  //     }
  //   }

  //   function reset() {
  //     // In a setup store, you manually reset each state property
  //     isSidebarOpen.value = true
  //     videos.value = []
  //     selectedVideo.value = null
  //     isLoading.value = false
  //     error.value = null
  //   }

  // --------------------------------------------------
  // RETURN
  // You must explicitly return all state, getters, and
  // actions you want to expose.
  // --------------------------------------------------
  // All state, getters, and actions that should be accessible
  // from outside the store must be returned here.
  return {
    // State
    isSidebarOpen,
    videos,
    selectedVideo,
    isLoading,
    error,
    // Getters
    // videoCount,
    // isReady,
    // // Actions
    // toggleSidebar,
    // selectVideo,
    // fetchVideos,
    // reset,
  }
})
