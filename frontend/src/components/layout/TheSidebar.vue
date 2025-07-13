<script setup>
import { useMainStore } from '@/stores/store'
import Drawer from 'primevue/drawer'
import SidebarNarrow from './SidebarNarrow.vue'
import SidebarWider from './SidebarWider.vue'

const mainStore = useMainStore()
</script>

<template>
  <div>
    <SidebarNarrow />
    <Drawer :visible="mainStore.isSidebarOpen">
      <div class="wider-sidebar-panel">
        <SidebarWider />
      </div>
    </Drawer>
  </div>
</template>

<style scoped>
.wider-sidebar-panel {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  background-color: #0f0f0f;
  border-right: 1px solid #383838;
}
</style>