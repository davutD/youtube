<script setup>
import Button from '@/components/common/Button.vue'
</script>

<template>
  <aside class="narrow-sidebar">
    <nav>
      <ul>
        <li>
          <Button icon="pi pi-home" label="Home" text />
        </li>
        <li>
          <Button icon="pi pi-bolt" label="Shorts" text />
        </li>
        <li>
          <Button icon="pi pi-list" label="Subscriptions" text />
        </li>
        <li>
          <Button icon="pi pi-user" label="You" text />
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.narrow-sidebar {
  position: fixed;
  top: 6.5rem;
  height: calc(100vh - 6.5rem);
  z-index: 999;
  padding: 0 1rem;
  border-right: 1px solid #383838;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li :deep(.p-button) {
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 0.75rem 0.5rem;
  line-height: 1.1;
}

li :deep(.p-button-icon) {
  font-size: 1.5rem;
}

li :deep(.p-button-label) {
  margin-top: 0.4rem;
  font-size: 0.65rem;
  font-weight: normal;
}
</style>