<script setup>
import Avatar from 'primevue/avatar'

defineProps({
  image: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Avatar :image="image" shape="circle" style="cursor: pointer" v-bind="$attrs" />
</template>