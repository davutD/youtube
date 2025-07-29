<script setup>
import { computed } from 'vue'

const props = defineProps({
  creator: {
    type: Object,
    required: true,
  },
})

const avatarSrc = computed(() => {
  if (props.creator?.avatarUrl) {
    return props.creator.avatarUrl
  }
  if (props.creator?.name) {
    const firstLetter = props.creator.name.charAt(0).toUpperCase()
    return `https://ui-avatars.com/api/?name=${firstLetter}&background=random&color=fff&size=128`
  }
  return `https://ui-avatars.com/api/?name=?&background=random&color=fff&size=128`
})
</script>

<template>
  <img :src="avatarSrc" alt="User Avatar" class="user-avatar" />
</template>

<style scoped>
.user-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>