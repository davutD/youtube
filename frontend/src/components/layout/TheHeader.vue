<script setup>
import { useMainStore } from '@/stores/store'
import InputText from 'primevue/inputtext'
import logoUrl from '@/assets/youtube_logo.png'
import Button from '@/components/common/Button.vue'
import IconButton from '@/components/common/IconButton.vue'
import AvatarButton from '@/components/common/AvatarButton.vue'

const mainStore = useMainStore()
</script>

<template>
  <header class="app-header">
    <div class="header-section left">
      <IconButton icon="pi pi-bars" @click="mainStore.toggleLeftSidebar" />
      <router-link to="/">
        <img :src="logoUrl" alt="Logo" class="logo" />
      </router-link>
    </div>

    <div class="header-section center">
      <div class="p-inputgroup">
        <InputText placeholder="Search" />
        <Button icon="pi pi-search" label="search" />
      </div>
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
  padding: 0 2.5px;
  border-bottom: 1px solid #383838;
}

.header-section {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid #383838;
}

.header-section.left {
  justify-content: flex-start;
  gap: 16px;
  width: 15%;
  padding: 0 25px;
}

.header-section.center {
  justify-content: center;
  width: 60%;
  padding: 0 25px;
}

.header-section.right {
  justify-content: flex-end;
  gap: 16px;
  width: 15%;
  padding: 0 25px;
}

.logo {
  height: 25px;
  display: block;
}

.p-inputgroup {
  max-width: 60rem;
}
</style>