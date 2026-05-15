<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
const props = defineProps<{ style: string }>()
const map: Record<string, any> = {
  '1': defineAsyncComponent(() => import('@/styles/MinimalStyle.vue')),
  '2': defineAsyncComponent(() => import('@/styles/GlassStyle.vue')),
  '3': defineAsyncComponent(() => import('@/styles/BrutalStyle.vue')),
  '4': defineAsyncComponent(() => import('@/styles/DarkGlowStyle.vue')),
  '5': defineAsyncComponent(() => import('@/styles/BentoStyle.vue')),
  '6': defineAsyncComponent(() => import('@/styles/GradientStyle.vue')),
  '7': defineAsyncComponent(() => import('@/styles/RetroStyle.vue')),
  '8': defineAsyncComponent(() => import('@/styles/TerminalStyle.vue')),
  '9': defineAsyncComponent(() => import('@/styles/EditorialStyle.vue')),
  '10': defineAsyncComponent(() => import('@/styles/CyberpunkStyle.vue')),
  '11': defineAsyncComponent(() => import('@/styles/PaperStyle.vue')),
  '12': defineAsyncComponent(() => import('@/styles/AuroraStyle.vue')),
}
const current = computed(() => map[props.style] || map['1'])
</script>
<template><component :is="current" /></template>
