<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const styles = [
  { id: 'minimal', label: '极简' },
  { id: 'glass', label: '玻璃拟态' },
  { id: 'brutal', label: '新野蛮' },
  { id: 'darkglow', label: '暗黑微光' },
  { id: 'bento', label: 'Bento' },
  { id: 'gradient', label: '渐变流体' },
]

function go(id: string) {
  router.push(`/style/${id}`)
}
</script>

<template>
  <div class="switcher">
    <div class="inner">
      <span class="label">风格切换</span>
      <div class="tabs">
        <button
          v-for="s in styles" :key="s.id"
          class="tab" :class="{ active: route.params.style === s.id }"
          @click="go(s.id)"
        >{{ s.label }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.switcher {
  position: fixed; top: 0; left: 0; right: 0;
  height: 44px; z-index: 99999;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.inner {
  max-width: 1080px; margin: 0 auto;
  height: 100%; display: flex; align-items: center;
  justify-content: center; gap: 16px; padding: 0 16px;
}
.label {
  font-size: 12px; color: rgba(255,255,255,0.4);
  white-space: nowrap;
}
.tabs { display: flex; gap: 4px; overflow-x: auto; }
.tab {
  padding: 4px 12px; border-radius: 6px;
  font-size: 12px; color: rgba(255,255,255,0.5);
  transition: all 0.2s; white-space: nowrap;
}
.tab:hover { color: #fff; background: rgba(255,255,255,0.08); }
.tab.active { color: #fff; background: rgba(255,255,255,0.15); }
</style>
