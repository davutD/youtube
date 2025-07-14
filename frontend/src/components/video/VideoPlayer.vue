<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

// 1. Define props and get a reference to them
const props = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
})

// 2. Create a ref for the <video> element and the player instance
const videoNode = ref(null)
let player = null

// 3. Set up the Video.js options using the videoSrc prop
const videoOptions = {
  autoplay: false,
  controls: true,
  responsive: true,
  fluid: true,
  sources: [
    {
      src: props.videoSrc,
      type: 'video/mp4',
    },
  ],
}

// 4. Initialize the player when the component is mounted to the DOM
onMounted(() => {
  if (videoNode.value) {
    player = videojs(videoNode.value, videoOptions)
  }
})

// 5. Destroy the player instance when the component is about to be unmounted
onBeforeUnmount(() => {
  if (player) {
    player.dispose()
  }
})
</script>

<template>
  <div class="video-container">
    <video ref="videoNode" class="video-js"></video>
  </div>
</template>

<style scoped>
/* This container helps maintain the aspect ratio and size */
.video-container {
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden; /* Ensures the video corners are also rounded */
}
</style>