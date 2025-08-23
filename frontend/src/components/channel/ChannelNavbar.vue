<script setup>
import { ref } from 'vue'
import TabMenu from 'primevue/tabmenu'

const props = defineProps({
  userId: String,
})

const items = ref([
  { label: 'Home', to: `/channel/${props.userId}` },
  { label: 'Videos', to: `/channel/${props.userId}/videos` },
  { label: 'Shorts', to: `/channel/${props.userId}/shorts` },
  { label: 'Live', to: `/channel/${props.userId}/live` },
])
</script>

<template>
  <div class="nav-container">
    <TabMenu :model="items" />
  </div>
</template>

<style scoped>
.nav-container {
  margin-top: 2rem;
}
</style>