<script setup>
import { useMainStore } from '@/stores/store'
import InputText from 'primevue/inputtext'
import logoUrl from '@/assets/youtube_logo.png'
import IconButton from '@/components/common/IconButton.vue'
import AvatarButton from '@/components/common/AvatarButton.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

const mainStore = useMainStore()

const toggleLeftSidebar = () => {
  mainStore.toggleLeftSidebar()
}
</script>

<template>
  <header class="app-header">
    <div class="header-section left">
      <IconButton icon="pi pi-bars" @click="toggleLeftSidebar" />
      <router-link to="/">
        <img :src="logoUrl" alt="Logo" class="logo" />
      </router-link>
    </div>

    <div class="header-section center">
      <InputGroup class="yt-inputgroup">
        <InputText placeholder="Search" />
        <InputGroupAddon>
          <IconButton icon="pi pi-search" :rounded="false" />
        </InputGroupAddon>
      </InputGroup>
    </div>

    <div class="header-section right">
      <IconButton icon="pi pi-video" />
      <IconButton icon="pi pi-bell" />
      <AvatarButton image="https://i.pravatar.cc/40" />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6.5rem;
  padding: 0 1rem;
  border-bottom: 1px solid #383838;
}

.header-section {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header-section.left {
  justify-content: flex-start;
  gap: 1.5rem;
  width: 15%;
  padding: 0 2rem;
}

.header-section.center {
  justify-content: center;
  width: 60%;
  padding: 0 2rem;
}

.header-section.right {
  justify-content: flex-end;
  gap: 1rem;
  width: 15%;
  padding: 0 2rem;
}

.logo {
  height: 1.5rem;
  display: block;
}

.yt-inputgroup {
  width: 100%;
  max-width: 40rem;
}
</style>