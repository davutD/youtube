<script setup>
import { ref } from 'vue'
import { useMainStore } from '@/stores/store'
import UserProfilePicture from '@/components/common/UserProfilePicture.vue'

const props = defineProps({
  comment: Object,
  videoId: String,
})

const mainStore = useMainStore()
const showReplyForm = ref(false)
const replyText = ref('')

function loadReplies() {
  mainStore.fetchReplies(props.comment)
}

function handlePostReply() {
  if (!replyText.value.trim()) return
  mainStore.replyComment(props.videoId, props.comment, replyText.value)
  replyText.value = ''
  showReplyForm.value = false
}
</script>

<template>
  <div class="comment-item">
    <UserProfilePicture :user="comment.creator" class="avatar" />
    <div class="comment-content">
      <strong>{{ comment.creator?.name || 'User' }} {{ comment.creator?.surname }}</strong>
      <p>{{ comment.content }}</p>

      <div class="actions">
        <button class="action-btn" @click="showReplyForm = !showReplyForm">Reply</button>
      </div>

      <div v-if="showReplyForm" class="reply-form">
        <textarea v-model="replyText" placeholder="Add a reply..."></textarea>
        <div class="reply-actions">
          <button @click="showReplyForm = false">Cancel</button>
          <button @click="handlePostReply">Reply</button>
        </div>
      </div>

      <button
        class="view-replies-btn"
        v-if="comment.comments?.length > 0 && !comment.repliesLoaded"
        @click="loadReplies"
      >
        View {{ comment.comments.length }} replies
      </button>

      <div v-if="comment.comments?.length > 0 && comment.repliesLoaded" class="replies">
        <CommentItem
          v-for="reply in comment.comments"
          :key="reply._id"
          :comment="reply"
          :video-id="videoId"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-item {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  align-self: flex-start;
}
.actions {
  margin-top: 0.5rem;
}
.action-btn {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 0;
}
.reply-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.reply-actions {
  display: flex;
  gap: 0.5rem;
  align-self: flex-end;
}
.view-replies-btn {
  margin-top: 0.5rem;
  background: none;
  border: none;
  color: #3ea6ff;
  cursor: pointer;
  padding: 0;
  font-weight: bold;
}
.replies {
  margin-top: 1rem;
  border-left: 2px solid #373737;
  padding-left: 1rem;
}
p {
  margin: 0;
}
</style>