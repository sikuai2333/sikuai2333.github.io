<script setup lang="ts">
import { ref, onMounted } from 'vue'
const visible = ref(true)
const progress = ref(0)
const emit = defineEmits<{done:[]}>()

onMounted(() => {
  // 模拟加载进度
  const iv = setInterval(() => {
    progress.value += Math.random() * 15 + 5
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(iv)
      setTimeout(() => { visible.value = false; emit('done') }, 400)
    }
  }, 120)
})
</script>

<template>
  <Transition name="loader">
    <div v-if="visible" class="loader">
      <div class="content">
        <div class="logo">◆</div>
        <div class="bar"><div class="fill" :style="{width:progress+'%'}"></div></div>
        <p class="pct">{{ Math.round(progress) }}%</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loader{position:fixed;inset:0;z-index:999999;background:#0a0a0f;display:flex;align-items:center;justify-content:center}
.content{text-align:center}
.logo{font-size:48px;margin-bottom:32px;animation:pulse 1.5s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:1}}
.bar{width:200px;height:2px;background:rgba(255,255,255,0.08);border-radius:1px;overflow:hidden}
.fill{height:100%;background:#fff;border-radius:1px;transition:width 0.15s ease}
.pct{margin-top:12px;font-size:12px;color:rgba(255,255,255,0.3);font-family:"SF Mono",monospace;letter-spacing:0.1em}
.loader-leave-active{transition:opacity 0.5s ease 0.1s}
.loader-leave-to{opacity:0}
</style>
