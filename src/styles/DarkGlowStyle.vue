<script setup lang="ts">
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()
</script>

<template>
  <div class="dark">
    <div class="bg"><div class="glow g1"></div><div class="glow g2"></div></div>
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
        <span class="link">进入 →</span>
      </a>
    </section>
    <footer><p>© 2026 · Portal</p></footer>
  </div>
</template>

<style scoped>
.dark { background: #0a0a0f; color: #f0ece4; min-height: 100vh; padding-top: calc(44px + 80px); position: relative; overflow: hidden; }
.bg { position: fixed; inset: 0; z-index: 0; }
.glow { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; }
.g1 { width: 600px; height: 600px; top: 5%; left: 15%; background: radial-gradient(circle, rgba(232,164,74,0.1), transparent 70%); }
.g2 { width: 500px; height: 500px; bottom: 10%; right: 10%; background: radial-gradient(circle, rgba(110,198,230,0.06), transparent 70%); }

.hero { position: relative; z-index: 1; text-align: center; padding: 0 20px 80px; max-width: 720px; margin: 0 auto; }
.date { font-size: 14px; color: rgba(240,236,228,0.35); letter-spacing: 0.08em; margin-bottom: 20px; }
.slogan {
  font-size: clamp(36px, 5vw, 56px); font-weight: 700;
  letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 24px;
  background: linear-gradient(135deg, #f0ece4, #e8a44a);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.clock {
  font-family: "SF Mono","Fira Code",monospace;
  font-size: clamp(40px, 7vw, 64px); font-weight: 300;
  color: rgba(240,236,228,0.5); line-height: 1; margin-bottom: 20px;
}
.weather { font-size: 15px; color: rgba(240,236,228,0.35); }

.cards {
  position: relative; z-index: 1;
  max-width: 720px; margin: 0 auto; padding: 0 20px 60px;
  display: grid; grid-template-columns: repeat(2,1fr); gap: 16px;
}
.card {
  padding: 28px; border-radius: 20px;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1); text-decoration: none; color: #f0ece4;
}
.card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.12); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
.icon { font-size: 28px; display: block; margin-bottom: 12px; }
.card h3 { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
.card p { font-size: 13px; color: rgba(240,236,228,0.4); margin-bottom: 16px; }
.link { font-size: 13px; font-weight: 500; color: #e8a44a; }

footer { position: relative; z-index: 1; text-align: center; padding: 40px 20px calc(60px + 44px); font-size: 13px; color: rgba(255,255,255,0.2); }
@media(max-width:640px){.cards{grid-template-columns:1fr}}
</style>
