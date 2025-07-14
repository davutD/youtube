<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/video/VideoPlayer.vue'
import Details from '@/components/video/Details.vue'
import CommentSection from '@/components/video/CommentSection.vue'
import RecommendedVideos from '@/components/video/RecommendedVideos.vue'

const videoData = ref({
  id: 'v123',
  videoSrc: '#',
  title: "My First Vue.js Application: A Beginner's Journey",
  views: '1.2M views',
  uploadDate: '3 weeks ago',
  description:
    'Join me as I explore the fundamentals of Vue 3, including the Composition API, script setup, and building reusable components. This is a great starting point for anyone new to the framework!',
  channel: {
    name: 'Vue Mastery',
    avatarUrl: 'https://i.pravatar.cc/40?u=1',
    subscriberCount: '1.2M',
  },
})

const commentsData = ref([
  {
    id: 1,
    author: 'Alex',
    avatarUrl: 'https://i.pravatar.cc/40?u=2',
    text: 'Great video! Really helped me understand the basics.',
  },
  {
    id: 2,
    author: 'Maria',
    avatarUrl: 'https://i.pravatar.cc/40?u=3',
    text: 'Could you do a follow-up on state management with Pinia?',
  },
  {
    id: 3,
    author: 'John',
    avatarUrl: 'https://i.pravatar.cc/40?u=4',
    text: 'This is exactly what I was looking for. Thanks!',
  },
])

const recommendedVideosData = ref([
  {
    id: 1,
    thumbnailUrl: 'https://picsum.photos/seed/10/160/90',
    title: 'Understanding Pinia State Management',
    channelName: 'Vue Mastery',
  },
  {
    id: 2,
    thumbnailUrl: 'https://picsum.photos/seed/11/160/90',
    title: 'Advanced Vue 3 Component Design',
    channelName: 'Dev Life',
  },
  {
    id: 3,
    thumbnailUrl: 'https://picsum.photos/seed/12/160/90',
    title: 'Building a Full-Stack App with Vue and Node.js',
    channelName: 'TechSource',
  },
])
</script>

<template>
  <div class="video-detail-layout">
    <div class="main-content">
      <VideoPlayer :video-src="videoData.videoSrc" />
      <Details :video="videoData" />
      <CommentSection :comments="commentsData" />
    </div>

    <div class="recommended-sidebar">
      <RecommendedVideos :videos="recommendedVideosData" />
    </div>
  </div>
</template>

<style scoped>
.video-detail-layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1.5rem;
  padding: 0 1.5rem;
  top: 0;
  border: 1px solid #08f90c;
}

.main-content {
  display: flex;
  flex-direction: column;
  border: 1px solid #e50b0b;
}

.recommended-sidebar {
  border: 1px solid #0b5be5;
}
</style>