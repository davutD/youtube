<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/stores/store'
import VideoCard from '@/components/video/VideoCard.vue'

const mainStore = useMainStore()
const route = useRoute()

onMounted(() => {
  mainStore.fetchAllVideosByCreator(route.params.userId)
})

watch(
  () => route.params.userId,
  (newId) => {
    if (newId) {
      mainStore.fetchAllVideosByCreator(newId)
    }
  }
)
</script>

<template>
  <div v-if="!mainStore.userVideoState.isLoading" class="video-grid">
    <VideoCard
      v-for="video in mainStore.userVideoState.data"
      :key="video._id"
      :video="video"
      :hide-creator-info="true"
    />
  </div>
  <div v-else>
    <p>Loading videos...</p>
  </div>
</template>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1400px) {
  .video-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 992px) {
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