<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Button from 'primevue/button'

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const authStore = useAuthStore()

const isLiked = computed(() => {
  if (!authStore.isAuthenticated) return false
  return props.video.likedUsers?.includes(authStore.user._id)
})
const isDisliked = computed(() => {
  if (!authStore.isAuthenticated) return false
  return props.video.dislikedUsers?.includes(authStore.user._id)
})

function handleLike() {
  authStore.likeVideo(props.video)
}

function handleDislike() {
  authStore.dislikeVideo(props.video)
}
</script>

<template>
  <div class="like-dislike-group">
    <Button
      :icon="isLiked ? 'pi pi-thumbs-up-fill' : 'pi pi-thumbs-up'"
      :label="(video.likeCount || 0).toString()"
      @click="handleLike"
      class="like-button"
      severity="secondary"
      outlined
    />
    <Button
      :icon="isDisliked ? 'pi pi-thumbs-down-fill' : 'pi pi-thumbs-down'"
      @click="handleDislike"
      class="dislike-button"
      severity="secondary"
      outlined
    />
  </div>
</template>

<style scoped>
.like-dislike-group {
  display: flex;
}
.like-button {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
  padding: 0.75rem 1.25rem;
  border-radius: 2rem 0 0 2rem;
}
.dislike-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 0.75rem 1.25rem;
  border-radius: 0 2rem 2rem 0;
}
.pi-thumbs-up-fill,
.pi-thumbs-down-fill {
  color: #3ea6ff;
}
</style>