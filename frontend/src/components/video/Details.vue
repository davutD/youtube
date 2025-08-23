<script setup>
import { computed } from 'vue'
import UserProfilePicture from '@/components/common/UserProfilePicture.vue'

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const formattedUploadDate = computed(() => {
  if (!props.video?.createdAt) return ''
  return new Date(props.video.createdAt).toLocaleDateString()
})
</script>

<template>
  <div class="video-details-container">
    <h2>{{ video.title }}</h2>
    <div class="channel-info">
      <router-link :to="`/channel/${video.creator._id}`">
        <UserProfilePicture :user="video.creator" class="avatar" />
      </router-link>

      <img v-if="video.creator?.avatarUrl" :src="video.creator.avatarUrl" alt="channel avatar" />
      <div>
        <router-link :to="`/channel/${video.creator._id}`" class="channel-link">
          <strong>{{ video.creator?.name }} {{ video.creator?.surname }}</strong>
        </router-link>
        <p>{{ video.creator.subscriberCount ?? 0 }} subscribers</p>
      </div>
    </div>
    <div class="description-box">
      <strong>{{ video.likeCount || 0 }} views &bull; {{ formattedUploadDate }}</strong>
      <p>{{ video.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.video-details-container {
  margin-top: 1rem;
}
.channel-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem 0;
}
.channel-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.description-box {
  background-color: #dfdddd;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 1rem;
}
p {
  margin: 0;
  line-height: 1.5;
}
.description-box p {
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
}
</style>