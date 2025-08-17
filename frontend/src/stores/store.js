import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

export const useMainStore = defineStore(
  'main',
  () => {
    const isSidebarOpen = ref(false)
    function toggleLeftSidebar() {
      isSidebarOpen.value = !isSidebarOpen.value
    }

    const videoState = reactive({
      data: [],
      isLoading: false,
      error: null,
    })

    const selectedVideoState = reactive({
      data: null,
      isLoading: false,
      error: null,
    })

    async function fetchAllVideos() {
      videoState.isLoading = true
      videoState.error = null
      try {
        const response = await apiClient.get('/videos')
        videoState.data = response.data
      } catch (e) {
        videoState.error = 'Failed to fetch videos.'
        videoState.error = 'Could not load videos.'
      } finally {
        videoState.isLoading = false
      }
    }

    async function fetchVideoById(id) {
      selectedVideoState.isLoading = true
      selectedVideoState.error = null
      try {
        const response = await apiClient.get(`/videos/${id}`)
        selectedVideoState.data = response.data
      } catch (e) {
        console.error(`Failed to fetch video ${id}:`, e)
        selectedVideoState.error = 'Could not load video.'
      } finally {
        selectedVideoState.isLoading = false
      }
    }

    async function makeComment(videoId, commentText) {
      console.log(videoId, commentText)
      try {
        const response = await apiClient.post(`users/video/${videoId}/comments`, {
          content: commentText,
        })
        if (selectedVideoState.data && selectedVideoState.data.comments) {
          selectedVideoState.data.comments.unshift(response.data)
        }
      } catch (e) {
        console.error('Failed to post comment:', e)
      }
    }

    async function replyComment(videoId, parentComment, replyText) {
      try {
        const response = await apiClient.post(
          `/users/video/${videoId}/comments/${parentComment._id}`,
          {
            content: replyText,
          },
        )
        if (!parentComment.comments) {
          parentComment.comments = []
        }
        parentComment.comments.unshift(response.data)
        parentComment.repliesLoaded = true

        if (selectedVideoState.data) {
          selectedVideoState.data.totalCommentCount++
        }
      } catch (e) {
        console.error('Failed to post reply:', e)
      }
    }

    async function fetchReplies(comment) {
      if (comment.repliesLoaded) return

      try {
        const response = await apiClient.get(`/comments/${comment._id}/replies`)
        comment.comments = response.data
        comment.repliesLoaded = true
      } catch (e) {
        console.error('Failed to fetch replies:', e)
      }
    }

    const pollingIntervals = new Map()

    async function pollVideoStatus(videoId) {
      if (pollingIntervals.has(videoId)) return

      const interval = setInterval(async () => {
        try {
          const response = await apiClient.get(`/videos/${videoId}`)
          const video = response.data
          const videoIndex = videoState.data.findIndex((v) => v._id === videoId)
          if (videoIndex !== -1) {
            videoState.data[videoIndex] = video
          }

          if (video.status === 'READY' || video.status === 'FAILED') {
            clearInterval(pollingIntervals.get(videoId))
            pollingIntervals.delete(videoId)
            console.log(`Polling stopped for video ${videoId}. Final status: ${video.status}`)
          }
        } catch (error) {
          console.error(`Failed to poll status for video ${videoId}:`, error)
          clearInterval(pollingIntervals.get(videoId))
          pollingIntervals.delete(videoId)
        }
      }, 5000)

      pollingIntervals.set(videoId, interval)
    }

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
      fetchAllVideos,
      fetchVideoById,
      makeComment,
      replyComment,
      fetchReplies,
      pollVideoStatus,
    }
  },
  {
    persist: {
      paths: ['isSidebarOpen', 'videoState.data'],
    },
  },
)
