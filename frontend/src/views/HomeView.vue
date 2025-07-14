<script setup>
import { ref } from 'vue'
import VideoCard from '@/components/video/VideoCard.vue'

const videos = ref([
  {
    id: 'vue-js-from-scratch-p1',
    thumbnailUrl: 'https://picsum.photos/seed/vue/400/225',
    title: 'Building a Vue.js App from Scratch',
    channelName: 'Vue Mastery',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=vuedev',
    views: '1.1M views',
    uploadDate: '2 weeks ago',
  },
  {
    id: 'perfect-desk-setup-2025',
    thumbnailUrl: 'https://picsum.photos/seed/desk/400/225',
    title: 'The Perfect Desk Setup for Developers (2025 Edition)',
    channelName: 'TechSource',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=tech',
    views: '876K views',
    uploadDate: '1 month ago',
  },
  {
    id: 'ultimate-paella-recipe',
    thumbnailUrl: 'https://picsum.photos/seed/food/400/225',
    title: 'Cooking the Ultimate Paella',
    channelName: 'Good Eats',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=cooking',
    views: '502K views',
    uploadDate: '3 days ago',
  },
  {
    id: 'primevue-component-tour',
    thumbnailUrl: 'https://picsum.photos/seed/prime/400/225',
    title: 'A Tour of the New PrimeVue Components',
    channelName: 'PrimeTek',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=prime',
    views: '10K views',
    uploadDate: '6 hours ago',
  },
  {
    id: 'pinia-state-management-guide',
    thumbnailUrl: 'https://picsum.photos/seed/pinia/400/225',
    title: 'Understanding Pinia State Management',
    channelName: 'Vue Mastery',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=vuedev',
    views: '450K views',
    uploadDate: '3 months ago',
  },
  {
    id: 'why-i-switched-to-fedora',
    thumbnailUrl: 'https://picsum.photos/seed/linux/400/225',
    title: 'Why I Switched to Fedora Linux',
    channelName: 'Dev Life',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=devlife',
    views: '215K views',
    uploadDate: '1 week ago',
  },
])
</script>

<template>
  <div class="video-grid">
    <VideoCard v-for="video in videos" :key="video.id" :video="video" />
  </div>
</template>

<style scoped>
.video-grid {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1200px) {
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>