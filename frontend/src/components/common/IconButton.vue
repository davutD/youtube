<script setup>
import Button from 'primevue/button'

defineProps({
  icon: {
    type: String,
    required: true,
  },
  rounded: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <Button :icon="icon" :class="{ 'p-button-rounded': rounded }" v-bind="$attrs" />
</template>