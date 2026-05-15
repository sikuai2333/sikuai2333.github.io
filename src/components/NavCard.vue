<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
  href?: string
  color?: string
}>()
</script>

<template>
  <a :href="href || '#'" class="nav-card scroll-reveal" :style="color ? { '--card-accent': color } : {}">
    <div class="nav-card-icon">{{ icon }}</div>
    <h3 class="nav-card-title">{{ title }}</h3>
    <p class="nav-card-desc">{{ description }}</p>
    <span class="nav-card-arrow cta-arrow">›</span>
  </a>
</template>

<style scoped>
.nav-card {
  --card-accent: var(--color-accent);
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
}

.nav-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(0, 113, 227, 0.04) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-default);
}

.nav-card:hover::before {
  opacity: 1;
}

.nav-card-icon {
  font-size: 40px;
  margin-bottom: 16px;
  line-height: 1;
}

.nav-card-title {
  font-size: var(--text-h3);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  margin-bottom: 8px;
  line-height: var(--leading-tight);
}

.nav-card-desc {
  font-size: var(--text-subhead);
  color: var(--color-text-secondary);
  max-width: 280px;
  line-height: var(--leading-relaxed);
  margin-bottom: 16px;
}

.nav-card-arrow {
  font-size: 24px;
  color: var(--card-accent);
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity var(--duration-fast) var(--ease-default),
              transform var(--duration-fast) var(--ease-default);
}

.nav-card:hover .nav-card-arrow {
  opacity: 1;
  transform: translateX(0);
}
</style>
