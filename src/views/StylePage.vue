<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps<{ style: string }>()

const components: Record<string, any> = {
  minimal: defineAsyncComponent(() => import('@/styles/MinimalStyle.vue')),
  glass: defineAsyncComponent(() => import('@/styles/GlassStyle.vue')),
  brutal: defineAsyncComponent(() => import('@/styles/BrutalStyle.vue')),
  darkglow: defineAsyncComponent(() => import('@/styles/DarkGlowStyle.vue')),
  bento: defineAsyncComponent(() => import('@/styles/BentoStyle.vue')),
  gradient: defineAsyncComponent(() => import('@/styles/GradientStyle.vue')),
}

const current = computed(() => components[props.style] || components.minimal)
</script>

<template>
  <component :is="current" />
</template>
