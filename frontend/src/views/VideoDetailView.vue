<script setup>
import { onMounted, watch } from 'vue'
import VideoPlayer from '@/components/video/VideoPlayer.vue'
import Details from '@/components/video/Details.vue'
import CommentSection from '@/components/video/CommentSection.vue'
import RecommendedVideos from '@/components/video/RecommendedVideos.vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/stores/store'

const route = useRoute()
const mainStore = useMainStore()

// helper to grab the numeric/string id from the URL
const videoId = () => route.params.id

// fetch when component mounts
onMounted(() => {
  mainStore.fetchVideoById(videoId())
})

// refetch if the user navigates to a different ID while on this page
watch(
  () => route.params.id,
  (newId) => {
    mainStore.fetchVideoById(newId)
  }
)
</script>

<template>
  <div>
    <p v-if="mainStore.selectedVideoState.isLoading">Loading...</p>
    <p v-else-if="mainStore.selectedVideoState.error">
      {{ mainStore.selectedVideoState.error }}
    </p>

    <div v-else-if="mainStore.selectedVideoState.data" class="video-detail-layout">
      <div class="main-content">
        <VideoPlayer :video-src="mainStore.selectedVideoState.data.videoSrc" />
        <Details :video="mainStore.selectedVideoState.data" />
        <CommentSection :comments="mainStore.selectedVideoState.data.comments || []" />
      </div>
      <div class="recommended-sidebar">
        <!-- show all videos or filter by something -->
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