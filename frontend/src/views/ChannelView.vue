<script setup>
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ChannelHeader from '@/components/channel/ChannelHeader.vue'
import ChannelNav from '@/components/channel/ChannelNavbar.vue'

const route = useRoute()
const authStore = useAuthStore()
const channel = computed(() => authStore.publicProfile)

onMounted(() => {
  authStore.fetchUserById(route.params.userId)
})

watch(
  () => route.params.userId,
  (newId) => {
    if (newId) {
      authStore.fetchUserById(newId)
    }
  }
)
</script>

<template>
  <div v-if="channel">
    <ChannelHeader :channel="channel" />
    <ChannelNav :user-id="channel._id" />
    <div class="channel-content">
      <router-view />
    </div>
  </div>
  <div v-else>
    <p>Loading channel...</p>
  </div>
</template>

<style scoped>
.channel-content {
  padding: 2rem;
}
</style>