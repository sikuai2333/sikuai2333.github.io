<script setup lang="ts">
import { useTime } from '@/composables/useTime'
import { useWeather } from '@/composables/useWeather'

const { time, date } = useTime()
const { temp, desc } = useWeather()
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero-bg">
      <div class="hero-glow"></div>
    </div>
    <div class="hero-content">
      <p class="hero-date">{{ date }}</p>
      <h1 class="hero-slogan">Explore · Create · Share</h1>
      <div class="hero-time">{{ time }}</div>
      <div class="hero-weather">
        <span v-if="desc" class="weather-text">淮北 · {{ desc }} {{ temp }}</span>
        <span v-else class="weather-text weather-loading">获取天气中…</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: calc(var(--nav-height) + 40px) 20px 60px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #f5f5f7 0%, #ffffff 100%);
  z-index: 0;
}

.hero-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(0, 113, 227, 0.06) 0%,
    rgba(0, 113, 227, 0.02) 40%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.hero-date {
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
  letter-spacing: 0.04em;
}

.hero-slogan {
  font-family: "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
  font-size: var(--text-hero);
  font-weight: 700;
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
  color: var(--color-text);
  margin-bottom: 16px;
}

.hero-time {
  font-size: clamp(48px, 8vw, 80px);
  font-variant-numeric: tabular-nums;
  color: var(--color-text);
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 20px;
  opacity: 0.85;
  font-weight: 300;
}

.hero-weather {
  font-size: var(--text-subhead);
  color: var(--color-text-secondary);
}

.weather-text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.weather-loading {
  opacity: 0.5;
}
</style>
