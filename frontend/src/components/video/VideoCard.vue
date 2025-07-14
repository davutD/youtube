<script setup>
defineProps({
  video: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="video-card">
    <router-link :to="'/video/' + video.id">
      <img :src="video.thumbnailUrl" alt="Video thumbnail" class="thumbnail" />
    </router-link>
    <div class="details">
      <img :src="video.channelAvatarUrl" alt="Channel avatar" class="channel-avatar" />
      <div class="meta">
        <h4 class="title">{{ video.title }}</h4>
        <p class="channel-name">{{ video.channelName }}</p>
        <p class="stats">{{ video.views }} &bull; {{ video.uploadDate }}</p>
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
  gap: 0.75rem;
}

.channel-avatar {
  width: 3rem;
  height: 3rem;
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
}

.channel-name,
.stats {
  font-size: 0.9rem;
  margin: 0;
}
</style>