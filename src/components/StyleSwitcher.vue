<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const styles = [
  { id: '1', label: '极简' },
  { id: '2', label: '新野蛮' },
  { id: '3', label: '终端' },
  { id: '4', label: '报刊' },
  { id: '5', label: '纸张' },
]
</script>

<template>
  <div class="switcher">
    <div class="inner">
      <span class="label">风格</span>
      <div class="tabs">
        <button v-for="s in styles" :key="s.id" class="tab" :class="{active: route.params.style===s.id}" @click="router.push('/'+s.id)">{{ s.label }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.switcher{position:fixed;top:0;left:0;right:0;height:44px;z-index:99999;background:rgba(0,0,0,0.88);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.08)}
.inner{max-width:1080px;margin:0 auto;height:100%;display:flex;align-items:center;gap:12px;padding:0 16px}
.label{font-size:12px;color:rgba(255,255,255,0.35);white-space:nowrap}
.tabs{display:flex;gap:4px}
.tab{padding:6px 14px;border-radius:6px;font-size:12px;color:rgba(255,255,255,0.45);transition:all 0.2s;white-space:nowrap}
.tab:hover{color:#fff;background:rgba(255,255,255,0.08)}
.tab.active{color:#fff;background:rgba(255,255,255,0.15)}
</style>
