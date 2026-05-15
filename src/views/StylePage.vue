<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
const props = defineProps<{ style: string }>()
const map: Record<string, any> = {
  '1': defineAsyncComponent(() => import('@/styles/MinimalStyle.vue')),
  '2': defineAsyncComponent(() => import('@/styles/BrutalStyle.vue')),
  '3': defineAsyncComponent(() => import('@/styles/TerminalStyle.vue')),
  '4': defineAsyncComponent(() => import('@/styles/EditorialStyle.vue')),
  '5': defineAsyncComponent(() => import('@/styles/PaperStyle.vue')),
}
const current = computed(() => map[props.style] || map['1'])
</script>
<template><component :is="current" /></template>
