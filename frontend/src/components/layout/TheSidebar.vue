<script setup>
import { useMainStore } from '@/stores/store'
import SidebarNarrow from './SidebarNarrow.vue'
import SidebarWider from './SidebarWider.vue'

const mainStore = useMainStore()
</script>

<template>
  <div>
    <SidebarNarrow v-if="mainStore.isSidebarOpen" />
    <SidebarWider v-else />
  </div>
</template>

<style scoped>
</style>