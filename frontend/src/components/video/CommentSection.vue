<script setup>
import { ref } from 'vue'
import { useMainStore } from '@/stores/store'
import CommentItem from './CommentItem.vue'

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const mainStore = useMainStore()
const newComment = ref('')

function handlePostComment() {
  if (!newComment.value.trim()) return
  mainStore.makeComment(props.video._id, newComment.value)
  newComment.value = ''
}
</script>

<template>
  <div class="comments-container">
    <h3>{{ video.totalCommentCount || 0 }} Comments</h3>

    <div class="comment-form">
      <textarea v-model="newComment" placeholder="Add a comment..."></textarea>
      <button @click="handlePostComment">Comment</button>
    </div>

    <CommentItem
      v-for="comment in video.comments"
      :key="comment._id"
      :comment="comment"
      :video-id="video._id"
    />
  </div>
</template>

<style scoped>
.comments-container {
  margin-top: 2rem;
}
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.comment-form textarea {
  width: 100%;
  min-height: 50px;
}
.comment-form button {
  align-self: flex-end;
}
</style>