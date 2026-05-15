<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const styles = [
  { id: '1', label: '极简' },
  { id: '2', label: '玻璃拟态' },
  { id: '3', label: '新野蛮' },
  { id: '4', label: '暗黑微光' },
  { id: '5', label: 'Bento' },
  { id: '6', label: '渐变流体' },
  { id: '7', label: '复古CRT' },
  { id: '8', label: '终端' },
  { id: '9', label: '报刊' },
  { id: '10', label: '赛博朋克' },
  { id: '11', label: '纸张' },
  { id: '12', label: '极光' },
]
</script>

<template>
  <div class="switcher">
    <div class="inner">
      <span class="label">风格</span>
      <div class="tabs">
        <button
          v-for="s in styles" :key="s.id"
          class="tab" :class="{ active: route.params.style === s.id }"
          @click="router.push(`/${s.id}`)"
        >{{ s.label }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.switcher{position:fixed;top:0;left:0;right:0;height:44px;z-index:99999;background:rgba(0,0,0,0.88);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.08)}
.inner{max-width:1080px;margin:0 auto;height:100%;display:flex;align-items:center;gap:12px;padding:0 16px}
.label{font-size:12px;color:rgba(255,255,255,0.35);white-space:nowrap;flex-shrink:0}
.tabs{display:flex;gap:3px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{padding:4px 10px;border-radius:6px;font-size:11px;color:rgba(255,255,255,0.45);transition:all 0.2s;white-space:nowrap;flex-shrink:0}
.tab:hover{color:#fff;background:rgba(255,255,255,0.08)}
.tab.active{color:#fff;background:rgba(255,255,255,0.15)}
</style>
