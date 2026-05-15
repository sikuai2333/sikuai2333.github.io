<script setup lang="ts">
import { useTime } from '@/composables/useTime'
import { useWeather } from '@/composables/useWeather'
const { time, date } = useTime()
const { temp, desc } = useWeather()
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero-bg">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <div class="noise"></div>
    </div>
    <div class="hero-content">
      <p class="date">{{ date }}</p>
      <h1 class="slogan">Explore · Create · Share</h1>
      <div class="time">{{ time }}</div>
      <div class="weather">
        <span v-if="desc">淮北 · {{ desc }} {{ temp }}</span>
        <span v-else class="dim">获取天气中…</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative; min-height: 65vh;
  display: flex; align-items: center; justify-content: center;
  padding: calc(var(--nav-height) + 60px) 20px 80px;
  overflow: hidden;
}
.hero-bg { position: absolute; inset: 0; }
.glow {
  position: absolute; border-radius: 50%;
  filter: blur(80px); pointer-events: none;
}
.glow-1 {
  width: 500px; height: 500px;
  top: 10%; left: 20%;
  background: radial-gradient(circle, var(--color-accent-glow), transparent 70%);
}
.glow-2 {
  width: 400px; height: 400px;
  bottom: 10%; right: 15%;
  background: radial-gradient(circle, rgba(110,198,230,0.08), transparent 70%);
}
.noise {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  background-repeat: repeat; opacity: 0.5;
}
.hero-content {
  position: relative; z-index: 1; text-align: center;
}
.date {
  font-size: 14px; font-weight: 500;
  color: var(--color-text-dim);
  letter-spacing: 0.08em; text-transform: uppercase;
  margin-bottom: 20px;
}
.slogan {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 700;
  line-height: var(--leading-tight);
  letter-spacing: -0.03em;
  margin-bottom: 24px;
  background: linear-gradient(135deg, var(--color-text), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.time {
  font-family: var(--font-mono);
  font-size: clamp(48px, 8vw, 80px);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1;
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 24px;
}
.weather {
  font-size: var(--text-subhead);
  color: var(--color-text-dim);
}
.dim { opacity: 0.4; }
</style>
