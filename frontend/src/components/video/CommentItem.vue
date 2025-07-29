<script setup>
import { useMainStore } from '@/stores/store'
import UserProfilePicture from '@/components/common/UserProfilePicture.vue'

const props = defineProps({
  comment: Object,
})

const mainStore = useMainStore()

function loadReplies() {
  mainStore.fetchReplies(props.comment)
}
</script>

<template>
  <div class="comment-item">
    <UserProfilePicture :creator="comment.creator" class="avatar" />
    <div class="comment-content">
      <strong>{{ comment.creator?.name || 'User' }} {{ comment.creator?.surname }}</strong>
      <p>{{ comment.content }}</p>

      <button v-if="comment.comments?.length > 0 && !comment.repliesLoaded" @click="loadReplies">
        View {{ comment.comments.length }} replies
      </button>

      <div v-if="comment.comments?.length > 0 && comment.repliesLoaded" class="replies">
        <CommentItem v-for="reply in comment.comments" :key="reply._id" :comment="reply" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-item {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
.avatar {
  width: 2.5rem;
  height: 2.5rem;
  background-color: #272727;
  align-self: flex-start;
}
.replies {
  margin-top: 1rem;
  border-left: 2px solid #373737;
  padding-left: 1rem;
}
p {
  margin: 0;
}
button {
  margin-top: 0.5rem;
  background: none;
  border: none;
  color: #3ea6ff;
  cursor: pointer;
  padding: 0;
  font-weight: bold;
}
</style>