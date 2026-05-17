<script setup lang="ts">
defineProps<{
  title: string
  desc: string
  icon: string
  href?: string
  bg?: string
}>()
</script>

<template>
  <a :href="href||'#'" class="card scroll-reveal" :style="bg?{background:bg}:{}">
    <span class="icon">{{ icon }}</span>
    <h3 class="title">{{ title }}</h3>
    <p class="desc">{{ desc }}</p>
    <span class="cta">进入 →</span>
  </a>
</template>

<style scoped>
.card{display:flex;flex-direction:column;justify-content:flex-end;min-height:200px;border-radius:var(--radius-card);padding:28px;cursor:pointer;position:relative;overflow:hidden;background:var(--color-bg-elevated);border:1px solid var(--color-divider);transition:transform .25s var(--ease-spring),box-shadow .25s,border-color .25s}
.card:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,0.4);border-color:rgba(255,255,255,0.1)}
.icon{font-size:32px;margin-bottom:14px;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.3))}
.title{font-family:var(--font-display);font-size:var(--text-h3);font-weight:700;margin-bottom:6px;letter-spacing:-0.01em}
.desc{font-size:var(--text-subhead);color:var(--color-text-dim);line-height:var(--leading-relaxed);margin-bottom:18px}
.cta{font-size:13px;font-weight:500;color:var(--color-accent);transition:letter-spacing .25s}
.card:hover .cta{letter-spacing:0.04em}
</style>
