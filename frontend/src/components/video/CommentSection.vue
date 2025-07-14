<script setup>
defineProps({
  comments: Array,
})
</script>

<template>
  <div class="comments-container">
    <h3>{{ comments.length }} Comments</h3>
    <div v-for="comment in comments" :key="comment.id" class="comment-item">
      <img :src="comment.avatarUrl" alt="commenter avatar" />
      <div>
        <strong>{{ comment.author }}</strong>
        <p>{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comments-container {
  margin-top: 2rem;
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
}
p {
  margin: 0;
}
</style>