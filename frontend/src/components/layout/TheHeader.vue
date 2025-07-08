<script setup>
import { useMainStore } from '@/stores/store'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'
import logoUrl from '@/assets/youtube_logo.png'

// Get the store to call the action for toggling the sidebar
const mainStore = useMainStore()
</script>

<template>
  <header class="app-header">
    <div class="header-section left">
      <Button icon="pi pi-bars" text rounded @click="mainStore.toggleLeftSidebar" />
      <router-link to="/">
        <img :src="logoUrl" alt="Logo" class="logo" />
      </router-link>
    </div>

    <div class="header-section center">
      <div class="p-inputgroup">
        <InputText placeholder="Search" />
        <Button icon="pi pi-search" />
      </div>
    </div>

    <div class="header-section right">
      <Button icon="pi pi-video" text rounded />
      <Button icon="pi pi-bell" text rounded />
      <Avatar image="https://i.pravatar.cc/40" shape="circle" />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  /* Positioning */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  /* Layout */
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* Appearance */
  height: 56px;
  padding: 0 24px;
  /* background-color: #212121; */
  border-bottom: 1px solid #383838;
}

.header-section {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header-section.left {
  justify-content: flex-start;
  gap: 16px;
}

.header-section.center {
  flex-grow: 1;
  justify-content: center;
  padding: 0 24px;
}

.header-section.right {
  justify-content: flex-end;
  gap: 8px;
}

.logo {
  height: 25px;
  display: block;
}

.p-inputgroup {
  max-width: 600px;
  width: 100%;
}
</style>