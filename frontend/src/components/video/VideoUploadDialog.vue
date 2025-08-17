<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/store'

import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'
import ProgressBar from 'primevue/progressbar'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
})
const emit = defineEmits(['update:modelValue'])

const store = useMainStore()

const uploadState = computed(() => store.uploadState)
const isClosable = computed(() => !['uploading', 'processing'].includes(store.uploadState.status))

function onFileSelect(event) {
  store.selectFileForUpload(event.files[0])
}

function handleUpload() {
  store.uploadVideo()
}

function closeDialog() {
  if (isClosable.value) {
    store.resetUploadState()
    emit('update:modelValue', false)
  }
}
</script>

<template>
  <Dialog
    :visible="modelValue"
    header="Upload Video"
    modal
    :closable="isClosable"
    :draggable="false"
    :style="{ width: '50rem' }"
    @update:visible="closeDialog"
  >
    <div class="dialog-content">
      <div v-if="uploadState.status === 'initial'">
        <FileUpload
          name="video"
          @select="onFileSelect"
          :showUploadButton="false"
          :showCancelButton="false"
          :multiple="false"
          accept="video/*"
          customUpload
        >
          <template #empty="{ openFileSelector }">
            <div class="dropzone" @click="openFileSelector">
              <i class="pi pi-cloud-upload"></i>
              <p>Drag and drop to upload video</p>
            </div>
          </template>
        </FileUpload>
      </div>

      <div v-else-if="uploadState.status === 'details'" class="details-state">
        <h3>Video Details</h3>
        <p class="filename"><strong>File:</strong> {{ uploadState.file.name }}</p>
        <div class="field">
          <label for="video-title">Title</label>
          <InputText id="video-title" v-model="uploadState.title" />
        </div>
        <div class="field">
          <label for="video-description">Description</label>
          <Textarea id="video-description" v-model="uploadState.description" rows="4" />
        </div>
      </div>

      <div v-else-if="uploadState.status === 'uploading'" class="progress-state">
        <h3>Uploading...</h3>
        <ProgressBar :value="uploadState.progress" />
        <small>{{ uploadState.file.name }} ({{ uploadState.progress }}%)</small>
      </div>

      <div v-else-if="uploadState.status === 'processing'" class="progress-state">
        <h3>Processing video...</h3>
        <p>This may take a few moments. You can close this window.</p>
        <ProgressBar mode="indeterminate" style="height: 0.5em" />
      </div>

      <div v-else-if="uploadState.status === 'success'" class="final-state">
        <i class="pi pi-check-circle success-icon"></i>
        <h3>Upload Successful!</h3>
        <p>Your video is now ready.</p>
      </div>

      <div v-else-if="uploadState.status === 'error'" class="final-state">
        <i class="pi pi-times-circle error-icon"></i>
        <h3>Upload Failed</h3>
        <p>{{ uploadState.error }}</p>
      </div>
    </div>

    <template #footer>
      <Button
        v-if="uploadState.status === 'details'"
        label="Upload"
        icon="pi pi-upload"
        @click="handleUpload"
      />
      <Button
        v-if="['success', 'error'].includes(uploadState.status)"
        label="Done"
        @click="closeDialog"
        autofocus
      />
    </template>
  </Dialog>
</template>

<style scoped>
.dialog-content {
  padding: 1rem;
}
.dropzone {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border: 3px dashed #4b5563;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  height: 20rem;
  cursor: pointer;
  color: #9ea1a7;
  transition: background-color 0.2s;
}
.dropzone:hover {
  background-color: #2c2c2e;
}
.dropzone .pi-cloud-upload {
  font-size: 4rem;
}
.details-state {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.filename {
  font-style: italic;
  color: #9ea1a7;
}
.progress-state,
.final-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 2rem;
}
.success-icon {
  font-size: 4rem;
  color: #10b981;
}
.error-icon {
  font-size: 4rem;
  color: #ef4444;
}
</style>