<script setup>
import { onMounted } from 'vue'
import { useMainStore } from '@/stores/store'
import VideoCard from '@/components/video/VideoCard.vue'

const mainStore = useMainStore()

onMounted(() => {
  mainStore.fetchAllVideos()
})
</script>

<template>
  <div v-if="!mainStore.videoState.isLoading" class="video-grid">
    <VideoCard v-for="video in mainStore.videoState.data" :key="video._id" :video="video" />
  </div>
  <div v-else>
    <p>Loading videos...</p>
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