<script setup>
import Button from '@/components/common/Button.vue'
</script>

<template>
  <nav class="wider-nav">
    <ul>
      <li><Button icon="pi pi-home" label="Home" text class="nav-item" /></li>
      <li><Button icon="pi pi-bolt" label="Shorts" text class="nav-item" /></li>
      <li><Button icon="pi pi-list" label="Subscriptions" text class="nav-item" /></li>
      <hr class="separator" />
      <li><Button icon="pi pi-user" label="Your channel" text class="nav-item" /></li>
      <li><Button icon="pi pi-history" label="History" text class="nav-item" /></li>
    </ul>
  </nav>
</template>

<style scoped>
.wider-nav {
  padding: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.separator {
  margin: 0.75rem 0;
  border-color: #383838;
  border-style: solid;
  border-width: 1px 0 0 0;
}

:deep(.nav-item) {
  width: 100%;
  justify-content: flex-start;
  padding: 0.75rem;
  border-radius: 0.5rem;
}

:deep(.nav-item .p-button-icon) {
  margin-right: 1.5rem;
  font-size: 1.25rem;
}

:deep(.nav-item .p-button-label) {
  font-weight: normal;
  font-size: 0.9rem;
}
</style>