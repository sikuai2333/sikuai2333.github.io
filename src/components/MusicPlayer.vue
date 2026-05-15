<script setup lang="ts">
import { ref } from 'vue'
const playing = ref(false)
</script>

<template>
  <div class="player">
    <div class="player-inner">
      <button class="play-btn" @click="playing = !playing" :aria-label="playing ? '暂停' : '播放'">
        <span v-if="playing">❚❚</span>
        <span v-else>▶</span>
      </button>
      <div class="track-info">
        <span class="track-name">音乐播放器</span>
        <span class="track-artist">添加 MP3 到 public/music/ 即可使用</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(10,10,15,0.8);
  backdrop-filter: blur(24px);
  border-top: 1px solid var(--color-divider);
  z-index: 9998;
  padding: 12px 0;
}
.player-inner {
  max-width: var(--max-width); margin: 0 auto;
  display: flex; align-items: center; gap: 14px;
  padding: 0 28px;
}
.play-btn {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-bg);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px;
  transition: transform var(--duration-fast) var(--ease-spring);
  flex-shrink: 0;
}
.play-btn:hover { transform: scale(1.08); }
.track-info { display: flex; flex-direction: column; gap: 2px; }
.track-name { font-size: 13px; font-weight: 500; }
.track-artist { font-size: 11px; color: var(--color-text-muted); }
</style>
