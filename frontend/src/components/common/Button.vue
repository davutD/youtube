<script setup>
import Button from 'primevue/button'

defineProps({
  label: String,
  icon: String,
})
</script>

<template>
  <Button :label="label" :icon="icon" class="p-button-text" v-bind="$attrs" />
</template>