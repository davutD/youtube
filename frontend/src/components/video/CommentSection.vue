<script setup>
import { ref } from 'vue'
import { useMainStore } from '@/stores/store'
import CommentItem from './CommentItem.vue' // Import the new recursive component

const props = defineProps({
  comments: Array,
  videoId: String,
})

const mainStore = useMainStore()
const newComment = ref('')

function handlePostComment() {
  if (!newComment.value.trim()) return
  mainStore.makeComment(props.videoId, newComment.value)
  newComment.value = ''
}
</script>

<template>
  <div class="comments-container">
    <h3>{{ comments.length }} Comments</h3>

    <!-- <div class="comment-form">
      <textarea v-model="newComment" placeholder="Add a comment..."></textarea>
      <button @click="handlePostComment">Comment</button>
    </div> -->

    <CommentItem v-for="comment in comments" :key="comment._id" :comment="comment" />
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
.comment-item {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}
.comment-item img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #272727;
}
p {
  margin: 0;
}
</style>