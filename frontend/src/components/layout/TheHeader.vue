<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '@/stores/store'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'

import Menu from 'primevue/menu'
import ConfirmDialog from 'primevue/confirmdialog'
import InputText from 'primevue/inputtext'
import logoUrl from '@/assets/youtube_logo.png'
import IconButton from '@/components/common/IconButton.vue'
import UserProfilePicture from '@/components/common/UserProfilePicture.vue'
import SplitButton from 'primevue/splitbutton'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import VideoUploadDialog from '@/components/video/VideoUploadDialog.vue'

const mainStore = useMainStore()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const confirm = useConfirm()

const showUploadDialog = ref(false)
const menu = ref()

const toggleLeftSidebar = () => {
  if (route.meta.showSidebar) {
    mainStore.toggleLeftSidebar()
  } else {
    mainStore.toggleDrawerSidebar()
  }
}

const toggleAvatarMenu = (event) => {
  menu.value.toggle(event)
}

const confirmLogout = () => {
  confirm.require({
    message: 'Are you sure you want to log out?',
    header: 'Logout Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: () => {
      authStore.logout()
    },
  })
}

const createItems = computed(() => [
  {
    label: 'Upload Video',
    icon: 'pi pi-upload',
    command: () => {
      if (authStore.isAuthenticated) {
        showUploadDialog.value = true
      } else {
        router.push('/login')
      }
    },
  },
  { label: 'Go Live', icon: 'pi pi-video' },
])

const avatarMenuItems = computed(() => {
  if (authStore.isAuthenticated) {
    return [
      { label: 'Your Channel', icon: 'pi pi-user' },
      { separator: true },
      { label: 'Logout', icon: 'pi pi-sign-out', command: confirmLogout },
    ]
  } else {
    return [
      { label: 'Login', icon: 'pi pi-sign-in', command: () => router.push('/auth/login') },
      { label: 'Register', icon: 'pi pi-user-plus', command: () => router.push('/auth/register') },
    ]
  }
})
</script>

<template>
  <header class="app-header">
    <ConfirmDialog />

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
      <SplitButton label="Create" :model="createItems" rounded severity="secondary" />
      <IconButton icon="pi pi-bell" />

      <button v-if="authStore.isAuthenticated" @click="toggleAvatarMenu" class="avatar-button">
        <UserProfilePicture :user="authStore.user" />
      </button>
      <IconButton v-else icon="pi pi-user-circle" @click="toggleAvatarMenu" class="guest-avatar" />

      <Menu ref="menu" :model="avatarMenuItems" :popup="true" />
    </div>

    <VideoUploadDialog v-model="showUploadDialog" />
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
  background-color: #fff;
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
  padding: 0 1rem;
}

.logo {
  height: 1.5rem;
  display: block;
}

.yt-inputgroup {
  width: 100%;
  max-width: 40rem;
}

.avatar-button {
  background: none;
  border: none;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
}

.guest-avatar {
  font-size: 2.5rem;
  width: 2.5rem;
  height: 2.5rem;
}
</style>