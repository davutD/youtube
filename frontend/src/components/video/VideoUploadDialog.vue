<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
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

const uploadState = ref('initial')
const uploadProgress = ref(0)
const errorMessage = ref('')
const selectedFile = ref(null)
const title = ref('')
const description = ref('')

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

const isClosable = computed(() => uploadState.value !== 'uploading')

function onFileSelect(event) {
  selectedFile.value = event.files[0]
  title.value = selectedFile.value.name.replace(/\.[^/.]+$/, '')
  uploadState.value = 'details'
}

async function handleUpload() {
  if (!selectedFile.value) return

  uploadState.value = 'uploading'
  errorMessage.value = ''
  uploadProgress.value = 0

  try {
    const initiateResponse = await apiClient.post('/users/videos/initiate-upload', {
      filename: selectedFile.value.name,
    })
    const { uploadUrl, key } = initiateResponse.data

    await axios.put(uploadUrl, selectedFile.value, {
      headers: { 'Content-Type': selectedFile.value.type },
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      },
    })

    await apiClient.post('/users/videos/finalize-upload', {
      key: key,
      title: title.value,
      description: description.value,
    })

    uploadState.value = 'success'
  } catch (error) {
    console.error('Upload failed:', error)
    errorMessage.value = error.response?.data?.message || 'The upload process failed.'
    uploadState.value = 'error'
  }
}

function closeDialog() {
  if (isClosable.value) {
    uploadState.value = 'initial'
    uploadProgress.value = 0
    errorMessage.value = ''
    selectedFile.value = null
    title.value = ''
    description.value = ''
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
      <div v-if="uploadState === 'initial'">
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

      <div v-else-if="uploadState === 'details'" class="details-state">
        <h3>Video Details</h3>
        <p class="filename"><strong>File:</strong> {{ selectedFile.name }}</p>
        <div class="field">
          <label for="video-title">Title</label>
          <InputText id="video-title" v-model="title" />
        </div>
        <div class="field">
          <label for="video-description">Description</label>
          <Textarea id="video-description" v-model="description" rows="4" />
        </div>
      </div>

      <div v-else-if="uploadState === 'uploading'" class="progress-state">
        <h3>Uploading...</h3>
        <ProgressBar :value="uploadProgress" />
        <small>{{ selectedFile.name }} ({{ uploadProgress }}%)</small>
      </div>

      <div v-else-if="uploadState === 'success'" class="final-state">
        <i class="pi pi-check-circle success-icon"></i>
        <h3>Upload Successful!</h3>
        <p>Your video is now being processed.</p>
      </div>

      <div v-else-if="uploadState === 'error'" class="final-state">
        <i class="pi pi-times-circle error-icon"></i>
        <h3>Upload Failed</h3>
        <p>{{ errorMessage }}</p>
      </div>
    </div>

    <template #footer>
      <Button
        v-if="uploadState === 'details'"
        label="Upload"
        icon="pi pi-upload"
        @click="handleUpload"
      />
      <Button
        v-if="uploadState === 'success' || uploadState === 'error'"
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