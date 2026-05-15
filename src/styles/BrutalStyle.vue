<script setup lang="ts">
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()
</script>

<template>
  <div class="brutal">
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
.brutal {
  background: #f5f0e8; color: #1a1a1a;
  min-height: 100vh; padding-top: calc(44px + 80px);
}
.hero { text-align: center; padding: 0 20px 80px; max-width: 720px; margin: 0 auto; }
.date { font-size: 14px; color: #666; letter-spacing: 0.08em; margin-bottom: 20px; }
.slogan {
  font-size: clamp(36px, 5vw, 56px); font-weight: 900;
  letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 24px;
  text-transform: uppercase;
}
.clock {
  font-family: "SF Mono","Fira Code",monospace;
  font-size: clamp(40px, 7vw, 64px); font-weight: 700;
  color: #1a1a1a; line-height: 1; margin-bottom: 20px;
}
.weather { font-size: 15px; color: #666; }

.cards {
  max-width: 720px; margin: 0 auto; padding: 0 20px 60px;
  display: grid; grid-template-columns: repeat(2,1fr); gap: 16px;
}
.card {
  padding: 28px; border-radius: 0;
  background: #fff; border: 3px solid #1a1a1a;
  box-shadow: 6px 6px 0 #1a1a1a;
  transition: all 0.15s; text-decoration: none; color: #1a1a1a;
}
.card:hover { transform: translate(3px,3px); box-shadow: 3px 3px 0 #1a1a1a; }
.icon { font-size: 28px; display: block; margin-bottom: 12px; }
.card h3 { font-size: 16px; font-weight: 800; margin-bottom: 4px; text-transform: uppercase; }
.card p { font-size: 13px; color: #666; }

footer {
  text-align: center; padding: 40px 20px calc(60px + 44px);
  font-size: 13px; color: #999;
}
@media(max-width:640px){.cards{grid-template-columns:1fr}}
</style>
