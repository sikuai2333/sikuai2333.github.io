<script setup lang="ts">
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()
</script>

<template>
  <div class="glass">
    <div class="bg"><div class="orb o1"></div><div class="orb o2"></div><div class="orb o3"></div></div>
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
.glass { background: #0a0a1a; min-height: 100vh; padding-top: calc(44px + 80px); position: relative; overflow: hidden; }
.bg { position: fixed; inset: 0; z-index: 0; }
.orb { position: absolute; border-radius: 50%; filter: blur(100px); }
.o1 { width: 500px; height: 500px; top: 10%; left: 10%; background: rgba(139,92,246,0.3); }
.o2 { width: 400px; height: 400px; top: 50%; right: 10%; background: rgba(59,130,246,0.25); }
.o3 { width: 350px; height: 350px; bottom: 10%; left: 30%; background: rgba(236,72,153,0.2); }

.hero { position: relative; z-index: 1; text-align: center; padding: 0 20px 80px; max-width: 720px; margin: 0 auto; }
.date { font-size: 14px; color: rgba(255,255,255,0.4); letter-spacing: 0.08em; margin-bottom: 20px; }
.slogan {
  font-size: clamp(36px, 5vw, 56px); font-weight: 700;
  letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 24px;
  background: linear-gradient(135deg, #fff, rgba(139,92,246,0.8));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.clock {
  font-family: "SF Mono","Fira Code",monospace;
  font-size: clamp(40px, 7vw, 64px); font-weight: 300;
  color: rgba(255,255,255,0.6); line-height: 1; margin-bottom: 20px;
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
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.3s; text-decoration: none; color: #fff;
}
.card:hover { background: rgba(255,255,255,0.1); transform: translateY(-4px); }
.icon { font-size: 28px; display: block; margin-bottom: 12px; }
.card h3 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.card p { font-size: 13px; color: rgba(255,255,255,0.5); }

footer {
  position: relative; z-index: 1;
  text-align: center; padding: 40px 20px calc(60px + 44px);
  font-size: 13px; color: rgba(255,255,255,0.3);
}
@media(max-width:640px){.cards{grid-template-columns:1fr}}
</style>
