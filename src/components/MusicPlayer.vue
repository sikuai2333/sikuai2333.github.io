<script setup lang="ts">
import { ref, computed } from 'vue'

interface Track {
  title: string
  artist: string
  src: string
}

const tracks: Track[] = [
  // 占位 - 添加音乐文件到 public/music/ 后取消注释
  // { title: '示例曲目', artist: 'Artist', src: '/music/sample.mp3' },
]

const audio = ref<HTMLAudioElement | null>(null)
const currentTrack = ref(0)
const playing = ref(false)
const progress = ref(0)
const duration = ref(0)
const showList = ref(false)

const hasTracks = computed(() => tracks.length > 0)
const track = computed(() => tracks[currentTrack.value])

function toggle() {
  if (!audio.value) return
  if (playing.value) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
  playing.value = !playing.value
}

function next() {
  if (tracks.length === 0) return
  currentTrack.value = (currentTrack.value + 1) % tracks.length
  playing.value = false
  progress.value = 0
}

function onTimeUpdate() {
  if (!audio.value) return
  progress.value = audio.value.currentTime
  duration.value = audio.value.duration || 0
}

function onEnded() {
  next()
  if (audio.value) audio.value.play()
  playing.value = true
}

function seek(e: MouseEvent) {
  if (!audio.value || !duration.value) return
  const rect = (e.target as HTMLElement).getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  audio.value.currentTime = ratio * duration.value
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${String(sec).padStart(2, '0')}`
}

const progressPercent = computed(() => {
  if (!duration.value) return 0
  return (progress.value / duration.value) * 100
})
</script>

<template>
  <div v-if="hasTracks" class="player">
    <audio
      ref="audio"
      :src="track?.src"
      @timeupdate="onTimeUpdate"
      @ended="onEnded"
    ></audio>

    <div class="player-inner">
      <div class="player-info">
        <span class="player-title">{{ track?.title }}</span>
        <span class="player-artist">{{ track?.artist }}</span>
      </div>

      <div class="player-controls">
        <button class="player-btn" @click="toggle">
          {{ playing ? '⏸' : '▶' }}
        </button>
        <button class="player-btn" @click="next">⏭</button>
      </div>

      <div class="player-progress" @click="seek">
        <div class="player-progress-bar" :style="{ width: progressPercent + '%' }"></div>
      </div>

      <span class="player-time">
        {{ formatTime(progress) }} / {{ formatTime(duration) }}
      </span>
    </div>
  </div>

  <!-- 无音乐时显示占位 -->
  <div v-else class="player player--empty">
    <div class="player-inner">
      <span class="player-empty-text">🎵 添加音乐文件到 public/music/ 即可播放</span>
    </div>
  </div>
</template>

<style scoped>
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(250, 250, 252, 0.9);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-top: 0.5px solid var(--color-divider);
  z-index: 9998;
  height: 56px;
}

.player-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 22px;
}

.player-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.player-title {
  font-size: 13px;
  font-weight: var(--font-medium);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-artist {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.player-controls {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.player-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 50%;
  transition: background var(--duration-fast) var(--ease-default);
}

.player-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.player-progress {
  flex: 1;
  height: 3px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.player-progress-bar {
  height: 100%;
  background: var(--color-accent);
  border-radius: 2px;
  transition: width 0.1s linear;
}

.player-time {
  font-size: 11px;
  color: var(--color-text-tertiary);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  flex-shrink: 0;
}

.player--empty {
  opacity: 0.6;
}

.player-empty-text {
  font-size: 13px;
  color: var(--color-text-tertiary);
}

@media (max-width: 768px) {
  .player-time {
    display: none;
  }
}
</style>
