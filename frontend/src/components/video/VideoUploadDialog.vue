<script setup>
import { defineProps, defineEmits } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from '@/components/common/Button.vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
})
const emit = defineEmits(['update:modelValue'])

function hide() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Dialog
    :visible="modelValue"
    header="Upload Video"
    modal
    closable
    :draggable="false"
    :style="{ width: '60rem', maxWidth: '90%' }"
    @hide="hide"
  >
    <div class="p-fluid p-formgrid p-grid"></div>
  </Dialog>
</template>

<style scoped>
.p-dialog {
  padding: 1rem;
}
</style>
