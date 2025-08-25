import { ref, reactive } from 'vue'
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

    const isDrawerSidebarOpen = ref(false)
    function toggleDrawerSidebar() {
      isDrawerSidebarOpen.value = !isDrawerSidebarOpen.value
    }

    function closeDrawerSidebar() {
      isDrawerSidebarOpen.value = false
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

    const userVideoState = reactive({
      data: [],
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

    async function fetchAllVideosByCreator(creatorId) {
      userVideoState.isLoading = true
      userVideoState.error = null
      try {
        const response = await apiClient.get(`/videos/search?userId=${creatorId}`)
        userVideoState.data = response.data
      } catch (e) {
        console.error('Failed to fetch creator videos:', e)
        userVideoState.error = 'Could not load videos for this channel.'
      } finally {
        userVideoState.isLoading = false
      }
    }

    async function makeComment(videoId, commentText) {
      try {
        const response = await apiClient.post(`users/video/${videoId}/comments`, {
          content: commentText,
        })
        if (selectedVideoState.data && selectedVideoState.data.comments) {
          selectedVideoState.data.comments = [response.data, ...selectedVideoState.data.comments]
          selectedVideoState.data.totalCommentCount++
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
        parentComment.comments = [response.data, ...(parentComment.comments || [])]
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

    const uploadState = reactive({
      status: 'initial',
      progress: 0,
      error: null,
      file: null,
      title: '',
      description: '',
    })

    function selectFileForUpload(file) {
      uploadState.file = file
      uploadState.title = file.name.replace(/\.[^/.]+$/, '')
      uploadState.status = 'details'
    }

    async function uploadVideo() {
      if (!uploadState.file) return

      uploadState.status = 'uploading'
      uploadState.progress = 0
      uploadState.error = null

      try {
        const {
          data: { uploadUrl, key },
        } = await apiClient.post('/users/videos/initiate-upload', {
          filename: uploadState.file.name,
        })

        await axios.put(uploadUrl, uploadState.file, {
          headers: { 'Content-Type': uploadState.file.type },
          onUploadProgress: (e) => (uploadState.progress = Math.round((e.loaded * 100) / e.total)),
        })

        const { data: newVideo } = await apiClient.post('/users/videos/finalize-upload', {
          key,
          title: uploadState.title,
          description: uploadState.description,
        })

        videoState.data.unshift(newVideo)

        uploadState.status = 'processing'
        await pollVideoStatus(newVideo._id)

        uploadState.status = 'success'
      } catch (err) {
        console.error('Upload process failed:', err)
        uploadState.error = err.response?.data?.message || 'The process failed.'
        uploadState.status = 'error'
      }
    }

    function resetUploadState() {
      uploadState.status = 'initial'
      uploadState.progress = 0
      uploadState.error = null
      uploadState.file = null
      uploadState.title = ''
      uploadState.description = ''
    }

    function pollVideoStatus(videoId) {
      return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          try {
            const response = await apiClient.get(`/videos/${videoId}`)
            const video = response.data

            const videoIndex = videoState.data.findIndex((v) => v._id === videoId)
            if (videoIndex !== -1) {
              videoState.data[videoIndex] = video
            }

            if (video.status === 'READY' || video.status === 'FAILED') {
              clearInterval(interval)
              video.status === 'READY' ? resolve(video) : reject(new Error('Processing failed'))
            }
          } catch (error) {
            clearInterval(interval)
            reject(error)
          }
        }, 5000)
      })
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
      isDrawerSidebarOpen,
      toggleLeftSidebar,
      toggleDrawerSidebar,
      closeDrawerSidebar,
      videoState,
      selectedVideoState,
      userVideoState,
      uploadState,
      fetchAllVideos,
      fetchVideoById,
      fetchAllVideosByCreator,
      makeComment,
      replyComment,
      fetchReplies,
      selectFileForUpload,
      uploadVideo,
      resetUploadState,
    }
  },
  {
    persist: {
      paths: ['isSidebarOpen', 'videoState.data'],
    },
  },
)
