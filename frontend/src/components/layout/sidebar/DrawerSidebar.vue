<script setup>
import { useMainStore } from '@/stores/store'
import Drawer from 'primevue/drawer'
import SidebarWider from './SidebarWider.vue'
import IconButton from '@/components/common/IconButton.vue'
import logoUrl from '@/assets/youtube_logo.png'

const mainStore = useMainStore()

const toggleLeftSidebar = () => {
  mainStore.toggleDrawerSidebar()
}
</script>

<template>
  <Drawer :visible="mainStore.isDrawerSidebarOpen" :showCloseIcon="false" class="app-drawer">
    <div class="shared-header-left-section">
      <IconButton icon="pi pi-bars" @click="toggleLeftSidebar" />
      <router-link to="/">
        <img :src="logoUrl" alt="Logo" class="logo" />
      </router-link>
    </div>
    <SidebarWider />
  </Drawer>
</template>

<style>
.app-drawer {
  width: 10rem;
}
.shared-header-left-section {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  padding: 0 2rem;
  padding-bottom: 10rem;
}

.shared-header-left-section .logo {
  height: 1.5rem;
  display: block;
}
</style>