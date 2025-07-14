<script setup>
defineProps({
  videos: Array,
})
</script>

<template>
  <div class="recommended-container">
    <div v-for="video in videos" :key="video.id" class="recommended-card">
      <img :src="video.thumbnailUrl" alt="thumbnail" />
      <div>
        <strong>{{ video.title }}</strong>
        <p>{{ video.channelName }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommended-card {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
}
.recommended-card img {
  width: 160px;
  height: 90px;
  object-fit: cover;
  border-radius: 0.5rem;
  background-color: #272727;
}
p {
  margin: 0;
  font-size: 0.8rem;
  color: #aaa;
}
</style>