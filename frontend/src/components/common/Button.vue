<script setup>
import PrimeButton from 'primevue/button'

const props = defineProps({
  label: String,
  icon: String,
})
</script>

<template>
  <PrimeButton :label="label" :icon="icon" v-bind="$attrs" />
</template>
