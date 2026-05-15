<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
  href?: string
  gradient?: string
}>()
</script>

<template>
  <a :href="href || '#'" class="card scroll-reveal" :style="gradient ? { background: gradient } : {}">
    <div class="card-inner">
      <span class="icon">{{ icon }}</span>
      <h3 class="title">{{ title }}</h3>
      <p class="desc">{{ description }}</p>
      <span class="cta">进入 →</span>
    </div>
  </a>
</template>

<style scoped>
.card {
  display: flex; align-items: flex-end;
  min-height: 220px;
  border-radius: var(--radius-card);
  overflow: hidden; cursor: pointer;
  position: relative;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-divider);
  transition: transform var(--duration-fast) var(--ease-spring),
              box-shadow var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
}
.card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  border-color: rgba(255,255,255,0.1);
}
.card-inner { padding: 28px; }
.icon {
  font-size: 36px; display: block; margin-bottom: 16px;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
}
.title {
  font-family: var(--font-display);
  font-size: var(--text-h3); font-weight: 700;
  color: var(--color-text); margin-bottom: 6px;
  letter-spacing: -0.01em;
}
.desc {
  font-size: var(--text-subhead);
  color: var(--color-text-dim);
  line-height: var(--leading-relaxed);
  margin-bottom: 20px;
}
.cta {
  display: inline-flex; align-items: center;
  font-size: 13px; font-weight: 500;
  color: var(--color-accent);
  transition: gap var(--duration-fast) var(--ease-out);
  gap: 4px;
}
.card:hover .cta { gap: 8px; }
</style>
