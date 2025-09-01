<script setup>
import { computed } from 'vue'
import SubscribeButton from '@/components/common/SubscribeButton.vue'
import LikeDislikeButtons from '@/components/common/LikeDislikeButtons.vue'
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
    <div class="actions-container">
      <div class="channel-info">
        <router-link :to="`/channel/${video.creator._id}`">
          <UserProfilePicture :user="video.creator" class="avatar" />
        </router-link>
        <div class="channel-meta">
          <router-link :to="`/channel/${video.creator._id}`" class="channel-link">
            <strong>{{ video.creator?.name }} {{ video.creator?.surname }}</strong>
          </router-link>
          <p>{{ video.creator.subscriberCount ?? 0 }} subscribers</p>
        </div>
        <SubscribeButton :channel="video.creator" />
      </div>

      <LikeDislikeButtons :video="video" />
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
.actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}
.channel-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem 0;
}
.channel-meta {
  margin-right: 1rem;
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
.channel-link {
  text-decoration: none;
  color: inherit;
}
.description-box p {
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
}
</style>