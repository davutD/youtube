<script setup>
import { computed } from 'vue'
import UserProfilePicture from '@/components/common/UserProfilePicture.vue'

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
  hideCreatorInfo: {
    type: Boolean,
    default: false,
  },
})

const formattedUploadDate = computed(() => {
  return new Date(props.video.createdAt).toLocaleDateString()
})
</script>

<template>
  <div v-if="video.status === 'READY'" class="video-card">
    <router-link :to="'/video/' + video._id">
      <img :src="video.thumbnailUrl" alt="Video thumbnail" class="thumbnail" />
    </router-link>

    <div class="details">
      <router-link v-if="!hideCreatorInfo" :to="`/channel/${video.creator._id}`">
        <UserProfilePicture :user="video.creator" class="channel-avatar" />
      </router-link>
      <div class="meta">
        <router-link :to="'/video/' + video._id" class="title-link">
          <h4 class="title">{{ video.title }}</h4>
        </router-link>
        <router-link
          v-if="!hideCreatorInfo"
          :to="`/channel/${video.creator._id}`"
          class="channel-name"
        >
          <strong>{{ video.creator?.name }} {{ video.creator?.surname }}</strong>
        </router-link>
        <p class="stats">{{ video.likeCount || 0 }} views &bull; {{ formattedUploadDate }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 0.75rem;
  margin-bottom: 0.75rem;
  background-color: #282828;
}

.details {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.channel-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #282828;
}

.meta {
  display: flex;
  flex-direction: column;
}

.title {
  font-weight: 500;
  margin: 0 0 0.25rem 0;
  text-decoration: none;
  color: inherit;
}
.title-link {
  text-decoration: none;
  color: inherit;
}

.channel-name,
.stats {
  font-size: 0.9rem;
  margin: 0;
  text-decoration: none;
  color: inherit;
}
</style>