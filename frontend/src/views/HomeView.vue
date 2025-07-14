<script setup>
import { onMounted, computed } from 'vue'
import { useMainStore } from '@/stores/store'
import VideoCard from '@/components/video/VideoCard.vue'

const mainStore = useMainStore()
const videos = computed(() => mainStore.videoState.data)

onMounted(() => {
  if (mainStore.videoState.data.length === 0) {
    mainStore.fetchAllVideos()
  }
})
</script>

<template>
  <div v-if="!mainStore.videoState.isLoading" class="video-grid">
    <VideoCard v-for="video in videos" :key="video.id" :video="video" />
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