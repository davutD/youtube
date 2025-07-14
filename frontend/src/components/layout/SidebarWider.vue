<script setup>
import Button from '@/components/common/Button.vue'
</script>

<template>
  <aside class="wider-sidebar">
    <nav>
      <ul>
        <li><Button icon="pi pi-home" label="Home" text class="nav-item" /></li>
        <li><Button icon="pi pi-bolt" label="Shorts" text class="nav-item" /></li>
        <li><Button icon="pi pi-list" label="Subscriptions" text class="nav-item" /></li>
        <hr />
        <li>
          <Button icon="pi pi-chevron-right" label="You" text class="nav-item" iconPos="right" />
        </li>
        <li><Button icon="pi pi-history" label="History" text class="nav-item" /></li>
        <li><Button icon="pi pi-list-check" label="Oynatma Listeleri" text class="nav-item" /></li>
        <li><Button icon="pi pi-youtube" label="Videos" text class="nav-item" /></li>
        <li><Button icon="pi pi-clock" label="Watch Later" text class="nav-item" /></li>
        <li><Button icon="pi pi-thumbs-up" label="Favorites" text class="nav-item" /></li>
        <hr />
        <h4>Subscriptions</h4>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.wider-sidebar {
  position: sticky;
  top: 0;
  width: auto;
  flex: 0 0 auto;
  height: calc(100vh - 6.5rem);
  /* z-index: 999; */
  padding: 0 0.5rem;
  border: 1px solid #383838;
  background-color: #fff;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

:deep(.nav-item) {
  width: 100%;
  justify-content: flex-start;
  padding: 0.75rem;
  border-radius: 0.5rem;
}

:deep(.nav-item .p-button-icon) {
  margin-right: 1rem;
  font-size: 1.25rem;
}

:deep(.nav-item .p-button-label) {
  font-weight: normal;
  font-size: 0.9rem;
}
</style>