<script setup>
defineProps({
  videoSrc: String,
})
</script>

<template>
  <div class="video-player-container">
    <p>Video Player Area</p>
  </div>
</template>

<style scoped>
.video-player-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
}
</style>