<script setup lang="ts">
import { useTime } from '@/composables/useTime'
import { useWeather } from '@/composables/useWeather'
const { time, date } = useTime()
const { temp, desc } = useWeather()
</script>

<template>
  <section id="hero" class="hero">
    <div class="bg">
      <div class="glow g1"></div>
      <div class="glow g2"></div>
    </div>
    <div class="content">
      <p class="date">{{ date }}</p>
      <h1 class="slogan">Explore · Create · Share</h1>
      <div class="clock">{{ time }}</div>
      <p class="weather">
        <span v-if="desc">淮北 · {{ desc }} {{ temp }}</span>
        <span v-else class="dim">获取天气中…</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero{position:relative;min-height:65vh;display:flex;align-items:center;justify-content:center;padding:calc(var(--nav-height) + 60px) 20px 80px;overflow:hidden}
.bg{position:absolute;inset:0}
.glow{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
.g1{width:500px;height:500px;top:10%;left:20%;background:radial-gradient(circle,var(--color-accent-glow),transparent 70%)}
.g2{width:400px;height:400px;bottom:10%;right:15%;background:radial-gradient(circle,rgba(110,198,230,0.06),transparent 70%)}
.content{position:relative;z-index:1;text-align:center}
.date{font-size:14px;font-weight:500;color:var(--color-text-dim);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:20px}
.slogan{font-family:var(--font-display);font-size:var(--text-hero);font-weight:700;line-height:var(--leading-tight);letter-spacing:-0.03em;margin-bottom:24px;background:linear-gradient(135deg,var(--color-text),var(--color-accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.clock{font-family:var(--font-mono);font-size:clamp(48px,8vw,80px);font-weight:300;letter-spacing:-0.02em;line-height:1;color:var(--color-text);opacity:0.7;margin-bottom:24px}
.weather{font-size:var(--text-subhead);color:var(--color-text-dim)}
.dim{opacity:0.4}
</style>
