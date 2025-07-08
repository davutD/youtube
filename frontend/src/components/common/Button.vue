<script setup>
import Button from 'primevue/button'

defineProps({
  label: String,
  icon: String,
})
</script>

<template>
  <Button :label="label" :icon="icon" v-bind="$attrs" />
</template>