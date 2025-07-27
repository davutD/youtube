<script setup>
import { watchEffect, computed, onMounted } from 'vue'
import VideoPlayer from '@/components/video/VideoPlayer.vue'
import Details from '@/components/video/Details.vue'
import CommentSection from '@/components/video/CommentSection.vue'
import RecommendedVideos from '@/components/video/RecommendedVideos.vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/stores/store'

const route = useRoute()
const mainStore = useMainStore()

const video = computed(() => mainStore.selectedVideoState.data)

watchEffect(() => {
  const videoId = route.params.id
  if (videoId) {
    mainStore.fetchVideoById(videoId)
  }
})
</script>

<template>
  <div>
    <p v-if="mainStore.selectedVideoState.isLoading">Loading video...</p>
    <p v-else-if="mainStore.selectedVideoState.error">{{ mainStore.selectedVideoState.error }}</p>
    <div v-else-if="video" class="video-detail-layout">
      <div class="main-content">
        <VideoPlayer :video-src="video.playbackUrl" />
        <Details :video="video" />
        <CommentSection :comments="video.comments || []" />
      </div>
      <div class="recommended-sidebar">
        <RecommendedVideos :videos="mainStore.videoState.data" />
      </div>
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
}

.main-content {
  display: flex;
  flex-direction: column;
}

.recommended-sidebar {
}
</style>