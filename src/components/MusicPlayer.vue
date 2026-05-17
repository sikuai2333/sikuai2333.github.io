<script setup lang="ts">
import { ref } from 'vue'
const playing = ref(false)
</script>

<template>
  <div class="player">
    <button class="btn" @click="playing=!playing">{{ playing ? '❚❚' : '▶' }}</button>
    <div class="info">
      <span class="name">音乐播放器</span>
      <span class="sub">添加 MP3 到 public/music/ 即可使用</span>
    </div>
  </div>
</template>

<style scoped>
.player{position:fixed;bottom:0;left:0;right:0;height:var(--player-height);background:rgba(10,10,15,0.85);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-top:1px solid var(--color-divider);z-index:9998;display:flex;align-items:center;gap:14px;padding:0 28px;max-width:100%}
.btn{width:36px;height:36px;border-radius:50%;background:var(--color-accent);color:var(--color-bg);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;transition:transform .25s var(--ease-spring)}
.btn:hover{transform:scale(1.08)}
.info{display:flex;flex-direction:column;gap:2px}
.name{font-size:13px;font-weight:500}
.sub{font-size:11px;color:var(--color-text-muted)}
</style>
