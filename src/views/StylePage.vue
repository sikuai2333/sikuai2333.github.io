<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
const props = defineProps<{ style: string }>()
const map: Record<string, any> = {
  minimal: defineAsyncComponent(() => import('@/styles/MinimalStyle.vue')),
  glass: defineAsyncComponent(() => import('@/styles/GlassStyle.vue')),
  brutal: defineAsyncComponent(() => import('@/styles/BrutalStyle.vue')),
  darkglow: defineAsyncComponent(() => import('@/styles/DarkGlowStyle.vue')),
  bento: defineAsyncComponent(() => import('@/styles/BentoStyle.vue')),
  gradient: defineAsyncComponent(() => import('@/styles/GradientStyle.vue')),
  retro: defineAsyncComponent(() => import('@/styles/RetroStyle.vue')),
  terminal: defineAsyncComponent(() => import('@/styles/TerminalStyle.vue')),
  editorial: defineAsyncComponent(() => import('@/styles/EditorialStyle.vue')),
  cyberpunk: defineAsyncComponent(() => import('@/styles/CyberpunkStyle.vue')),
  paper: defineAsyncComponent(() => import('@/styles/PaperStyle.vue')),
  aurora: defineAsyncComponent(() => import('@/styles/AuroraStyle.vue')),
}
const current = computed(() => map[props.style] || map.minimal)
</script>
<template><component :is="current" /></template>
