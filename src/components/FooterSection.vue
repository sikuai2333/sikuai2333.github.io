<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <p class="footer-text">© {{ year }} · Portal</p>
  </footer>
</template>

<style scoped>
.footer {
  padding: 40px 20px 100px; /* 底部留空给音乐播放器 */
  text-align: center;
}

.footer-text {
  font-size: var(--text-caption);
  color: var(--color-text-tertiary);
}
</style>
