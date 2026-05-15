<script setup lang="ts">
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()
</script>

<template>
  <div class="minimal">
    <section class="hero">
      <p class="date">{{ date }}</p>
      <h1 class="slogan">Explore · Create · Share</h1>
      <div class="clock">{{ time }}</div>
      <p class="weather">
        <span v-if="desc">淮北 · {{ desc }} {{ temp }}</span>
        <span v-else class="dim">获取天气中…</span>
      </p>
    </section>
    <section class="cards">
      <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
        <span class="icon">{{ c.icon }}</span>
        <div>
          <h3>{{ c.title }}</h3>
          <p>{{ c.desc }}</p>
        </div>
        <span class="arrow">→</span>
      </a>
    </section>
    <footer><p>© 2026 · Portal</p></footer>
  </div>
</template>

<style scoped>
.minimal {
  --bg: #fafafa; --fg: #1d1d1f; --dim: #86868b;
  --accent: #0071e3; --card-bg: #fff;
  background: var(--bg); color: var(--fg);
  min-height: 100vh; padding-top: calc(44px + 80px);
}
.hero { text-align: center; padding: 0 20px 80px; max-width: 720px; margin: 0 auto; }
.date { font-size: 14px; color: var(--dim); letter-spacing: 0.08em; margin-bottom: 20px; }
.slogan {
  font-size: clamp(36px, 5vw, 56px); font-weight: 700;
  letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 24px;
}
.clock {
  font-family: "SF Mono","Fira Code",monospace;
  font-size: clamp(40px, 7vw, 64px); font-weight: 300;
  color: var(--dim); line-height: 1; margin-bottom: 20px;
}
.weather { font-size: 15px; color: var(--dim); }
.dim { opacity: 0.4; }

.cards {
  max-width: 720px; margin: 0 auto; padding: 0 20px 60px;
  display: flex; flex-direction: column; gap: 1px;
}
.card {
  display: flex; align-items: center; gap: 16px;
  padding: 20px 24px; background: var(--card-bg);
  border-radius: 12px; transition: all 0.2s;
  text-decoration: none; color: var(--fg);
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.card:hover { transform: translateX(4px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.icon { font-size: 24px; flex-shrink: 0; }
.card h3 { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
.card p { font-size: 13px; color: var(--dim); }
.arrow { margin-left: auto; color: var(--accent); font-size: 18px; }
footer {
  text-align: center; padding: 40px 20px calc(60px + 44px);
  font-size: 13px; color: var(--dim);
}
</style>
