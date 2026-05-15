<script setup lang="ts">
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()
</script>

<template>
  <div class="grad">
    <div class="mesh"></div>
    <section class="hero">
      <p class="date">{{ date }}</p>
      <h1 class="slogan">Explore · Create · Share</h1>
      <div class="clock">{{ time }}</div>
      <p class="weather">
        <span v-if="desc">淮北 · {{ desc }} {{ temp }}</span>
        <span v-else>获取天气中…</span>
      </p>
    </section>
    <section class="cards">
      <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
        <span class="icon">{{ c.icon }}</span>
        <h3>{{ c.title }}</h3>
        <p>{{ c.desc }}</p>
      </a>
    </section>
    <footer><p>© 2026 · Portal</p></footer>
  </div>
</template>

<style scoped>
.grad { background: #0d0d1a; color: #fff; min-height: 100vh; padding-top: calc(44px + 80px); position: relative; overflow: hidden; }
.mesh {
  position: fixed; inset: 0; z-index: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(168,85,247,0.25), transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.2), transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(236,72,153,0.15), transparent 50%),
    radial-gradient(ellipse at 70% 60%, rgba(16,185,129,0.12), transparent 40%);
}

.hero { position: relative; z-index: 1; text-align: center; padding: 0 20px 80px; max-width: 720px; margin: 0 auto; }
.date { font-size: 14px; color: rgba(255,255,255,0.4); letter-spacing: 0.08em; margin-bottom: 20px; }
.slogan {
  font-size: clamp(36px, 5vw, 56px); font-weight: 700;
  letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 24px;
  background: linear-gradient(135deg, #a855f7, #3b82f6, #ec4899, #10b981);
  background-size: 300% 300%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: mesh-shift 8s ease infinite;
}
@keyframes mesh-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
.clock {
  font-family: "SF Mono","Fira Code",monospace;
  font-size: clamp(40px, 7vw, 64px); font-weight: 300;
  color: rgba(255,255,255,0.5); line-height: 1; margin-bottom: 20px;
}
.weather { font-size: 15px; color: rgba(255,255,255,0.4); }

.cards {
  position: relative; z-index: 1;
  max-width: 720px; margin: 0 auto; padding: 0 20px 60px;
  display: grid; grid-template-columns: repeat(2,1fr); gap: 16px;
}
.card {
  padding: 28px; border-radius: 20px;
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.3s; text-decoration: none; color: #fff;
}
.card:hover { background: rgba(255,255,255,0.1); transform: translateY(-4px); }
.icon { font-size: 28px; display: block; margin-bottom: 12px; }
.card h3 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.card p { font-size: 13px; color: rgba(255,255,255,0.5); }

footer { position: relative; z-index: 1; text-align: center; padding: 40px 20px calc(60px + 44px); font-size: 13px; color: rgba(255,255,255,0.25); }
@media(max-width:640px){.cards{grid-template-columns:1fr}}
</style>
