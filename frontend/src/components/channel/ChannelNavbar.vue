<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'

const props = defineProps({
  userId: String,
})

const route = useRoute()
const router = useRouter()

const activeTab = computed(() => route.path)

const items = computed(() => [
  { to: `/channel/${props.userId}`, label: 'Home' },
  { to: `/channel/${props.userId}/videos`, label: 'Videos' },
  // { to: `/channel/${props.userId}/shorts`, label: 'Shorts' },
  // { to: `/channel/${props.userId}/live`, label: 'Live' },
])

function navigateTo(path) {
  router.push(path)
}
</script>

<template>
  <div class="card">
    <Tabs :value="activeTab">
      <TabList>
        <Tab v-for="tab in items" :key="tab.label" :value="tab.to" @click="navigateTo(tab.to)">
          <span>{{ tab.label }}</span>
        </Tab>
      </TabList>
    </Tabs>
  </div>
</template>

<style scoped>
.card {
  margin-top: 1rem;
}
</style>