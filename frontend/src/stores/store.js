import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const isSidebarOpen = ref(false)
  function toggleLeftSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  // Bundled state for the video list
  const videoState = reactive({
    data: [],
    isLoading: false,
    error: null,
  })

  // Bundled state for a single selected video
  const selectedVideoState = reactive({
    data: null,
    isLoading: false,
    error: null,
  })

  // --- Getters ---
  // Getters now access properties of the reactive objects.
  //   const videoCount = computed(() => videoState.data.length)
  //   const isReady = computed(() => !videoState.isLoading && videoState.error === null)

  // --- Actions ---
  // Actions now mutate properties of the reactive objects.
  //   function selectVideo(video) {
  //     selectedVideoState.data = video
  //   }

  //   async function fetchVideos() {
  //     videoState.isLoading = true
  //     videoState.error = null
  //     try {
  //       // Simulate an API call
  //       await new Promise((resolve) => setTimeout(resolve, 1000))

  //       const mockVideos = [
  //         { id: 'v1', title: 'First Vue Video' },
  //         { id: 'v2', title: 'Learning Pinia Setup Stores' },
  //         { id: 'v3', title: 'PrimeVue Still Rocks!' },
  //       ]

  //       videoState.data = mockVideos
  //     } catch (e) {
  //       videoState.error = 'Failed to fetch videos.'
  //       videoState.data = []
  //     } finally {
  //       videoState.isLoading = false
  //     }
  //   }

  //   function reset() {
  //     // Reset refs and properties of reactive objects
  //     isSidebarOpen.value = true
  //
  //     videoState.data = []
  //     videoState.isLoading = false
  //     videoState.error = null
  //
  //     selectedVideoState.data = null
  //     selectedVideoState.isLoading = false
  //     selectedVideoState.error = null
  //   }

  // --------------------------------------------------
  // RETURN
  // You must explicitly return all state, getters, and
  // actions you want to expose.
  // --------------------------------------------------
  return {
    isSidebarOpen,
    toggleLeftSidebar,
    videoState,
    selectedVideoState,
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
