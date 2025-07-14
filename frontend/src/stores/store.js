import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

const allVideos = [
  {
    id: 'vue-js-from-scratch-p1',
    videoSrc: 'https://www.youtube.com/watch?v=dtYN2GWS37c',
    thumbnailUrl: 'https://picsum.photos/seed/vue/400/225',
    title: 'Building a Vue.js App from Scratch',
    views: '1.1M views',
    uploadDate: '2 weeks ago',
    description:
      'Join me as I explore the fundamentals of Vue 3, including the Composition API, script setup, and building reusable components.',
    channel: {
      name: 'Vue Mastery',
      avatarUrl: 'https://i.pravatar.cc/40?u=vuedev',
      subscriberCount: '1.2M',
    },
    comments: [
      { id: 1, author: 'Alex', avatarUrl: 'https://i.pravatar.cc/40?u=2', text: 'Great video!' },
      {
        id: 2,
        author: 'Maria',
        avatarUrl: 'https://i.pravatar.cc/40?u=3',
        text: 'Could you do a follow-up on Pinia?',
      },
    ],
  },
  {
    id: 'perfect-desk-setup-2025',
    videoSrc: 'https://www.youtube.com/watch?v=dtYN2GWS37c',
    thumbnailUrl: 'https://picsum.photos/seed/desk/400/225',
    title: 'The Perfect Desk Setup for Developers (2025 Edition)',
    views: '876K views',
    uploadDate: '1 month ago',
    description: 'A look at the latest gadgets and ergonomic setups to maximize productivity.',
    channel: {
      name: 'TechSource',
      avatarUrl: 'https://i.pravatar.cc/40?u=tech',
      subscriberCount: '2.5M',
    },
    comments: [
      {
        id: 1,
        author: 'Dave',
        avatarUrl: 'https://i.pravatar.cc/40?u=dave',
        text: 'That monitor is amazing!',
      },
    ],
  },
  {
    id: 'vue-js-from-scratch-p1',
    videoSrc: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/vue/400/225',
    title: 'Building a Vue.js App from Scratch',
    views: '1.1M views',
    uploadDate: '2 weeks ago',
    description:
      'Join me as I explore the fundamentals of Vue 3, including the Composition API, script setup, and building reusable components.',
    channel: {
      name: 'Vue Mastery',
      avatarUrl: 'https://i.pravatar.cc/40?u=vuedev',
      subscriberCount: '1.2M',
    },
    comments: [
      { id: 1, author: 'Alex', avatarUrl: 'https://i.pravatar.cc/40?u=2', text: 'Great video!' },
      {
        id: 2,
        author: 'Maria',
        avatarUrl: 'https://i.pravatar.cc/40?u=3',
        text: 'Could you do a follow-up on Pinia?',
      },
    ],
  },
  {
    id: 'perfect-desk-setup-2025',
    videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/desk/400/225',
    title: 'The Perfect Desk Setup for Developers (2025 Edition)',
    views: '876K views',
    uploadDate: '1 month ago',
    description: 'A look at the latest gadgets and ergonomic setups to maximize productivity.',
    channel: {
      name: 'TechSource',
      avatarUrl: 'https://i.pravatar.cc/40?u=tech',
      subscriberCount: '2.5M',
    },
    comments: [
      {
        id: 1,
        author: 'Dave',
        avatarUrl: 'https://i.pravatar.cc/40?u=dave',
        text: 'That monitor is amazing!',
      },
    ],
  },
  {
    id: 'vue-js-from-scratch-p1',
    videoSrc: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/vue/400/225',
    title: 'Building a Vue.js App from Scratch',
    views: '1.1M views',
    uploadDate: '2 weeks ago',
    description:
      'Join me as I explore the fundamentals of Vue 3, including the Composition API, script setup, and building reusable components.',
    channel: {
      name: 'Vue Mastery',
      avatarUrl: 'https://i.pravatar.cc/40?u=vuedev',
      subscriberCount: '1.2M',
    },
    comments: [
      { id: 1, author: 'Alex', avatarUrl: 'https://i.pravatar.cc/40?u=2', text: 'Great video!' },
      {
        id: 2,
        author: 'Maria',
        avatarUrl: 'https://i.pravatar.cc/40?u=3',
        text: 'Could you do a follow-up on Pinia?',
      },
    ],
  },
  {
    id: 'perfect-desk-setup-2025',
    videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/desk/400/225',
    title: 'The Perfect Desk Setup for Developers (2025 Edition)',
    views: '876K views',
    uploadDate: '1 month ago',
    description: 'A look at the latest gadgets and ergonomic setups to maximize productivity.',
    channel: {
      name: 'TechSource',
      avatarUrl: 'https://i.pravatar.cc/40?u=tech',
      subscriberCount: '2.5M',
    },
    comments: [
      {
        id: 1,
        author: 'Dave',
        avatarUrl: 'https://i.pravatar.cc/40?u=dave',
        text: 'That monitor is amazing!',
      },
    ],
  },
  {
    id: 'vue-js-from-scratch-p1',
    videoSrc: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/vue/400/225',
    title: 'Building a Vue.js App from Scratch',
    views: '1.1M views',
    uploadDate: '2 weeks ago',
    description:
      'Join me as I explore the fundamentals of Vue 3, including the Composition API, script setup, and building reusable components.',
    channel: {
      name: 'Vue Mastery',
      avatarUrl: 'https://i.pravatar.cc/40?u=vuedev',
      subscriberCount: '1.2M',
    },
    comments: [
      { id: 1, author: 'Alex', avatarUrl: 'https://i.pravatar.cc/40?u=2', text: 'Great video!' },
      {
        id: 2,
        author: 'Maria',
        avatarUrl: 'https://i.pravatar.cc/40?u=3',
        text: 'Could you do a follow-up on Pinia?',
      },
    ],
  },
  {
    id: 'perfect-desk-setup-2025',
    videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/desk/400/225',
    title: 'The Perfect Desk Setup for Developers (2025 Edition)',
    views: '876K views',
    uploadDate: '1 month ago',
    description: 'A look at the latest gadgets and ergonomic setups to maximize productivity.',
    channel: {
      name: 'TechSource',
      avatarUrl: 'https://i.pravatar.cc/40?u=tech',
      subscriberCount: '2.5M',
    },
    comments: [
      {
        id: 1,
        author: 'Dave',
        avatarUrl: 'https://i.pravatar.cc/40?u=dave',
        text: 'That monitor is amazing!',
      },
    ],
  },
  {
    id: 'vue-js-from-scratch-p1',
    videoSrc: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/vue/400/225',
    title: 'Building a Vue.js App from Scratch',
    views: '1.1M views',
    uploadDate: '2 weeks ago',
    description:
      'Join me as I explore the fundamentals of Vue 3, including the Composition API, script setup, and building reusable components.',
    channel: {
      name: 'Vue Mastery',
      avatarUrl: 'https://i.pravatar.cc/40?u=vuedev',
      subscriberCount: '1.2M',
    },
    comments: [
      { id: 1, author: 'Alex', avatarUrl: 'https://i.pravatar.cc/40?u=2', text: 'Great video!' },
      {
        id: 2,
        author: 'Maria',
        avatarUrl: 'https://i.pravatar.cc/40?u=3',
        text: 'Could you do a follow-up on Pinia?',
      },
    ],
  },
  {
    id: 'perfect-desk-setup-2025',
    videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/desk/400/225',
    title: 'The Perfect Desk Setup for Developers (2025 Edition)',
    views: '876K views',
    uploadDate: '1 month ago',
    description: 'A look at the latest gadgets and ergonomic setups to maximize productivity.',
    channel: {
      name: 'TechSource',
      avatarUrl: 'https://i.pravatar.cc/40?u=tech',
      subscriberCount: '2.5M',
    },
    comments: [
      {
        id: 1,
        author: 'Dave',
        avatarUrl: 'https://i.pravatar.cc/40?u=dave',
        text: 'That monitor is amazing!',
      },
    ],
  },
  {
    id: 'vue-js-from-scratch-p1',
    videoSrc: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/vue/400/225',
    title: 'Building a Vue.js App from Scratch',
    views: '1.1M views',
    uploadDate: '2 weeks ago',
    description:
      'Join me as I explore the fundamentals of Vue 3, including the Composition API, script setup, and building reusable components.',
    channel: {
      name: 'Vue Mastery',
      avatarUrl: 'https://i.pravatar.cc/40?u=vuedev',
      subscriberCount: '1.2M',
    },
    comments: [
      { id: 1, author: 'Alex', avatarUrl: 'https://i.pravatar.cc/40?u=2', text: 'Great video!' },
      {
        id: 2,
        author: 'Maria',
        avatarUrl: 'https://i.pravatar.cc/40?u=3',
        text: 'Could you do a follow-up on Pinia?',
      },
    ],
  },
  {
    id: 'perfect-desk-setup-2025',
    videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/desk/400/225',
    title: 'The Perfect Desk Setup for Developers (2025 Edition)',
    views: '876K views',
    uploadDate: '1 month ago',
    description: 'A look at the latest gadgets and ergonomic setups to maximize productivity.',
    channel: {
      name: 'TechSource',
      avatarUrl: 'https://i.pravatar.cc/40?u=tech',
      subscriberCount: '2.5M',
    },
    comments: [
      {
        id: 1,
        author: 'Dave',
        avatarUrl: 'https://i.pravatar.cc/40?u=dave',
        text: 'That monitor is amazing!',
      },
    ],
  },
  {
    id: 'vue-js-from-scratch-p1',
    videoSrc: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/vue/400/225',
    title: 'Building a Vue.js App from Scratch',
    views: '1.1M views',
    uploadDate: '2 weeks ago',
    description:
      'Join me as I explore the fundamentals of Vue 3, including the Composition API, script setup, and building reusable components.',
    channel: {
      name: 'Vue Mastery',
      avatarUrl: 'https://i.pravatar.cc/40?u=vuedev',
      subscriberCount: '1.2M',
    },
    comments: [
      { id: 1, author: 'Alex', avatarUrl: 'https://i.pravatar.cc/40?u=2', text: 'Great video!' },
      {
        id: 2,
        author: 'Maria',
        avatarUrl: 'https://i.pravatar.cc/40?u=3',
        text: 'Could you do a follow-up on Pinia?',
      },
    ],
  },
  {
    id: 'perfect-desk-setup-2025',
    videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/desk/400/225',
    title: 'The Perfect Desk Setup for Developers (2025 Edition)',
    views: '876K views',
    uploadDate: '1 month ago',
    description: 'A look at the latest gadgets and ergonomic setups to maximize productivity.',
    channel: {
      name: 'TechSource',
      avatarUrl: 'https://i.pravatar.cc/40?u=tech',
      subscriberCount: '2.5M',
    },
    comments: [
      {
        id: 1,
        author: 'Dave',
        avatarUrl: 'https://i.pravatar.cc/40?u=dave',
        text: 'That monitor is amazing!',
      },
    ],
  },
  {
    id: 'vue-js-from-scratch-p1',
    videoSrc: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/vue/400/225',
    title: 'Building a Vue.js App from Scratch',
    views: '1.1M views',
    uploadDate: '2 weeks ago',
    description:
      'Join me as I explore the fundamentals of Vue 3, including the Composition API, script setup, and building reusable components.',
    channel: {
      name: 'Vue Mastery',
      avatarUrl: 'https://i.pravatar.cc/40?u=vuedev',
      subscriberCount: '1.2M',
    },
    comments: [
      { id: 1, author: 'Alex', avatarUrl: 'https://i.pravatar.cc/40?u=2', text: 'Great video!' },
      {
        id: 2,
        author: 'Maria',
        avatarUrl: 'https://i.pravatar.cc/40?u=3',
        text: 'Could you do a follow-up on Pinia?',
      },
    ],
  },
  {
    id: 'perfect-desk-setup-2025',
    videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/desk/400/225',
    title: 'The Perfect Desk Setup for Developers (2025 Edition)',
    views: '876K views',
    uploadDate: '1 month ago',
    description: 'A look at the latest gadgets and ergonomic setups to maximize productivity.',
    channel: {
      name: 'TechSource',
      avatarUrl: 'https://i.pravatar.cc/40?u=tech',
      subscriberCount: '2.5M',
    },
    comments: [
      {
        id: 1,
        author: 'Dave',
        avatarUrl: 'https://i.pravatar.cc/40?u=dave',
        text: 'That monitor is amazing!',
      },
    ],
  },
]

export const useMainStore = defineStore('main', () => {
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
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      videoState.data = allVideos
    } catch (e) {
      videoState.error = 'Failed to fetch videos.'
    } finally {
      videoState.isLoading = false
    }
  }

  async function fetchVideoById(id) {
    selectedVideoState.isLoading = true
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const video = allVideos.find((v) => v.id === id)
      if (video) {
        selectedVideoState.data = video
      } else {
        throw new Error('Video not found')
      }
    } catch (e) {
      selectedVideoState.error = e.message
    } finally {
      selectedVideoState.isLoading = false
    }
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
