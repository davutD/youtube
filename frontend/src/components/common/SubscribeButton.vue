<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Button from 'primevue/button'

const props = defineProps({
  channel: {
    type: Object,
    required: true,
  },
})

const authStore = useAuthStore()

console.log(props)

const isSubscribed = computed(() => {
  if (!authStore.isAuthenticated || !props.channel?.subscribers) {
    return false
  }
  return props.channel.subscribers.includes(authStore.user._id)
})

function handleSubscribeToggle() {
  if (isSubscribed.value) {
    authStore.unsubscribe(props.channel._id)
  } else {
    authStore.subscribe(props.channel._id)
  }
}
</script>

<template>
  <div>
    <Button
      v-if="authStore.isAuthenticated && authStore.user._id !== channel._id"
      :label="isSubscribed ? 'Subscribed' : 'Subscribe'"
      :icon="isSubscribed ? 'pi pi-check' : 'pi pi-bell'"
      :severity="isSubscribed ? 'secondary' : 'danger'"
      rounded
      @click="handleSubscribeToggle"
    />
    <Button
      v-else-if="!authStore.isAuthenticated"
      label="Subscribe"
      icon="pi pi-bell"
      rounded
      @click="handleSubscribeToggle"
    />
  </div>
</template>