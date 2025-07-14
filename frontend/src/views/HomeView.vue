<script setup>
import { ref } from 'vue'
import VideoCard from '@/components/video/VideoCard.vue'

const videos = ref([
  {
    id: 1,
    thumbnailUrl: 'https://picsum.photos/seed/1/400/225',
    title: 'Building a Vue.js App from Scratch',
    channelName: 'Vue Mastery',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=1',
    views: '1.1M views',
    uploadDate: '2 weeks ago',
  },
  {
    id: 2,
    thumbnailUrl: 'https://picsum.photos/seed/2/400/225',
    title: 'The Perfect Desk Setup for Developers',
    channelName: 'TechSource',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=2',
    views: '876K views',
    uploadDate: '1 month ago',
  },
  {
    id: 3,
    thumbnailUrl: 'https://picsum.photos/seed/3/400/225',
    title: 'Cooking the Ultimate Paella',
    channelName: 'Good Eats',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=3',
    views: '502K views',
    uploadDate: '3 days ago',
  },
  {
    id: 4,
    thumbnailUrl: 'https://picsum.photos/seed/4/400/225',
    title: 'A Tour of the New PrimeVue Components',
    channelName: 'PrimeTek',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=4',
    views: '10K views',
    uploadDate: '6 hours ago',
  },
  {
    id: 5,
    thumbnailUrl: 'https://picsum.photos/seed/5/400/225',
    title: 'Understanding Pinia State Management',
    channelName: 'Vue Mastery',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=1',
    views: '450K views',
    uploadDate: '3 months ago',
  },
  {
    id: 6,
    thumbnailUrl: 'https://picsum.photos/seed/6/400/225',
    title: 'Why I Switched to Fedora Linux',
    channelName: 'Dev Life',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=5',
    views: '215K views',
    uploadDate: '1 week ago',
  },
  {
    id: 7,
    thumbnailUrl: 'https://picsum.photos/seed/7/400/225',
    title: "Beginner's Guide to CSS Grid",
    channelName: 'Web Simplified',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=6',
    views: '2.5M views',
    uploadDate: '1 year ago',
  },
  {
    id: 8,
    thumbnailUrl: 'https://picsum.photos/seed/8/400/225',
    title: 'Exploring the Mountains of Switzerland',
    channelName: 'Travel Vibes',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=7',
    views: '734K views',
    uploadDate: '5 days ago',
  },
  {
    id: 9,
    thumbnailUrl: 'https://picsum.photos/seed/9/400/225',
    title: 'How to Properly Tune a Guitar',
    channelName: 'Music Theory',
    channelAvatarUrl: 'https://i.pravatar.cc/40?u=8',
    views: '998K views',
    uploadDate: '6 months ago',
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