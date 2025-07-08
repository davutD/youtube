<script setup>
import Button from 'primevue/button'

defineProps({
  icon: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Button :icon="icon" class="p-button-rounded p-button-text" v-bind="$attrs" />
</template>