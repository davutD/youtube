<script setup>
import UserProfilePicture from '@/components/common/UserProfilePicture.vue'
import SubscribeButton from '@/components/common/SubscribeButton.vue'

defineProps({
  channel: Object,
})
</script>

<template>
  <div class="channel-header">
    <div class="banner">
      <img src="https://picsum.photos/seed/channel-banner/1200/300" alt="Channel banner" />
    </div>
    <div class="header-content">
      <UserProfilePicture :user="channel" class="channel-avatar" />
      <div class="channel-info">
        <h1>{{ channel.name }} {{ channel.surname }}</h1>
        <div class="stats">
          <span>{{ channel.subscriberCount }} subscribers</span>
          <span>&bull;</span>
          <span>{{ channel.videoCount }} videos</span>
        </div>
        <p class="description">
          {{ channel.description || 'This channel does not have a description.' }}
        </p>
        <SubscribeButton :channel="channel" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  height: 200px;
  background-color: #333;
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0 2rem;
  /* margin-top: -50px; */
}
.channel-avatar {
  width: 150px;
  height: 150px;
  border: 4px solid #181818;
}
.channel-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.stats {
  color: #aaa;
}
</style>