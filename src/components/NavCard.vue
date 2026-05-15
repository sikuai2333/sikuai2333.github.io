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
  <a :href="href || '#'" class="nav-card scroll-reveal" :style="gradient ? { background: gradient } : {}">
    <div class="nav-card-icon">{{ icon }}</div>
    <h3 class="nav-card-title">{{ title }}</h3>
    <p class="nav-card-desc">{{ description }}</p>
    <span class="nav-card-cta">
      了解更多 <span class="cta-arrow">›</span>
    </span>
  </a>
</template>

<style scoped>
.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: var(--color-bg-card);
  border-radius: var(--radius-card);
  padding: var(--tile-padding);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform var(--duration-fast) var(--ease-default),
              box-shadow var(--duration-fast) var(--ease-default);
}

.nav-card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.nav-card-icon {
  font-size: 48px;
  margin-bottom: 20px;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.nav-card-title {
  font-size: var(--text-h3);
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  line-height: var(--leading-tight);
  text-shadow: 0 1px 3px rgba(0,0,0,0.15);
}

.nav-card-desc {
  font-size: var(--text-subhead);
  color: rgba(255,255,255,0.85);
  max-width: 280px;
  line-height: var(--leading-relaxed);
  margin-bottom: 20px;
}

.nav-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border-radius: 980px;
  padding: 8px 20px;
  transition: background var(--duration-fast) var(--ease-default);
}

.nav-card:hover .nav-card-cta {
  background: rgba(255,255,255,0.35);
}

.cta-arrow {
  font-size: 18px;
  transition: transform var(--duration-fast) var(--ease-default);
}

.nav-card:hover .cta-arrow {
  transform: translateX(3px);
}
</style>
