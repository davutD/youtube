<script setup>
defineProps({
  video: Object,
})
</script>

<template>
  <div class="video-details-container">
    <h2>{{ video.title }}</h2>
    <div class="channel-info">
      <img :src="video.channel.avatarUrl" alt="channel avatar" />
      <div>
        <strong>{{ video.channel.name }}</strong>
        <p>{{ video.channel.subscriberCount }} subscribers</p>
      </div>
    </div>
    <div class="description-box">
      <strong>{{ video.views }} &bull; {{ video.uploadDate }}</strong>
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
  background-color: #272727;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 1rem;
}
p {
  margin: 0;
  line-height: 1.5;
}
</style>