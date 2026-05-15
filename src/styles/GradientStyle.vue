<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()

const counters = ref([
  { label: '项目', value: 0, target: 12 },
  { label: '文章', value: 0, target: 48 },
  { label: 'Star', value: 0, target: 256 },
])
onMounted(() => {
  counters.value.forEach(c => {
    let cur = 0
    const step = Math.ceil(c.target / 50)
    const iv = setInterval(() => { cur += step; if (cur >= c.target) { cur = c.target; clearInterval(iv) }; c.value = cur }, 25)
  })
})
const rings = [
  { label: '前端', pct: 90, color: '#a855f7' },
  { label: '后端', pct: 75, color: '#3b82f6' },
  { label: '设计', pct: 65, color: '#ec4899' },
]
</script>

<template>
<div class="page">
  <div class="mesh"></div>
  <section class="hero">
    <p class="date">{{ date }}</p>
    <h1 class="slogan">Explore · Create · Share</h1>
    <div class="clock">{{ time }}</div>
    <p class="weather"><span v-if="desc">淮北 · {{ desc }} {{ temp }}</span><span v-else>获取中…</span></p>
  </section>

  <section class="counters">
    <div v-for="c in counters" :key="c.label" class="counter">
      <div class="c-num">{{ c.value }}</div>
      <div class="c-label">{{ c.label }}</div>
    </div>
  </section>

  <section class="rings">
    <div v-for="r in rings" :key="r.label" class="ring-item">
      <svg viewBox="0 0 36 36" class="ring">
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="3"/>
        <circle cx="18" cy="18" r="15.9" fill="none" :stroke="r.color" stroke-width="3"
          stroke-linecap="round" :stroke-dasharray="`${r.pct} ${100-r.pct}`"
          stroke-dashoffset="25" style="transition:stroke-dasharray 1s ease"/>
      </svg>
      <div class="ring-label">{{ r.label }}</div>
      <div class="ring-pct">{{ r.pct }}%</div>
    </div>
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
.page{background:#0d0d1a;color:#fff;min-height:100vh;padding-top:calc(44px+60px);position:relative;overflow:hidden}
.mesh{position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse at 20% 50%,rgba(168,85,247,0.2),transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(59,130,246,0.15),transparent 50%),radial-gradient(ellipse at 50% 80%,rgba(236,72,153,0.12),transparent 50%)}
.hero{position:relative;z-index:1;text-align:center;padding:0 20px 60px;max-width:720px;margin:0 auto}
.date{font-size:14px;color:rgba(255,255,255,0.35);letter-spacing:0.08em;margin-bottom:16px}
.slogan{font-size:clamp(32px,5vw,52px);font-weight:700;letter-spacing:-0.03em;line-height:1.1;margin-bottom:20px;background:linear-gradient(135deg,#a855f7,#3b82f6,#ec4899,#10b981);background-size:300% 300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shift 8s ease infinite}
@keyframes shift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.clock{font-family:"SF Mono",monospace;font-size:clamp(36px,6vw,56px);font-weight:300;color:rgba(255,255,255,0.45);line-height:1;margin-bottom:16px}
.weather{font-size:15px;color:rgba(255,255,255,0.35)}

.counters{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 48px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center}
.counter{padding:24px;border-radius:20px;background:rgba(255,255,255,0.05);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.08)}
.c-num{font-size:clamp(28px,4vw,40px);font-weight:700;background:linear-gradient(135deg,#a855f7,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.c-label{font-size:13px;color:rgba(255,255,255,0.4);margin-top:4px}

.rings{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 48px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center}
.ring-item{display:flex;flex-direction:column;align-items:center;gap:8px}
.ring{width:80px;height:80px}
.ring-label{font-size:13px;color:rgba(255,255,255,0.5)}
.ring-pct{font-size:18px;font-weight:700}

.cards{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 60px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.card{padding:28px;border-radius:20px;background:rgba(255,255,255,0.06);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.08);transition:all 0.3s;text-decoration:none;color:#fff}
.card:hover{background:rgba(255,255,255,0.1);transform:translateY(-4px)}
.icon{font-size:28px;display:block;margin-bottom:12px}
.card h3{font-size:16px;font-weight:600;margin-bottom:4px}
.card p{font-size:13px;color:rgba(255,255,255,0.45)}
footer{position:relative;z-index:1;text-align:center;padding:40px 20px 80px;font-size:13px;color:rgba(255,255,255,0.2)}
@media(max-width:640px){.cards{grid-template-columns:1fr}.counters,.rings{grid-template-columns:1fr}}
</style>
