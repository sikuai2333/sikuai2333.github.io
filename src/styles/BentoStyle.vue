<script setup lang="ts">
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()
</script>

<template>
  <div class="bento">
    <div class="grid">
      <div class="cell hero-cell">
        <p class="date">{{ date }}</p>
        <h1 class="slogan">Explore<br>Create<br>Share</h1>
      </div>
      <div class="cell clock-cell">
        <span class="label">时间</span>
        <div class="clock">{{ time }}</div>
      </div>
      <div class="cell weather-cell">
        <span class="label">天气</span>
        <div v-if="desc" class="w-info">{{ desc }} {{ temp }}</div>
        <div v-else class="w-info dim">获取中…</div>
        <div class="w-loc">淮北</div>
      </div>
      <a v-for="(c, i) in cards" :key="c.title" :href="c.href" class="cell card-cell" :class="'c'+i">
        <span class="icon">{{ c.icon }}</span>
        <h3>{{ c.title }}</h3>
        <p>{{ c.desc }}</p>
      </a>
      <div class="cell footer-cell">
        <p>© 2026 · Portal</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bento { background: #0c0c14; color: #e8e8ec; min-height: 100vh; padding: calc(44px + 24px) 16px 80px; }
.grid {
  max-width: 800px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(3,1fr); grid-auto-rows: minmax(120px,auto); gap: 12px;
}
.cell {
  padding: 24px; border-radius: 20px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
  transition: all 0.25s; text-decoration: none; color: #e8e8ec;
  display: flex; flex-direction: column; justify-content: space-between;
}
.cell:hover { border-color: rgba(255,255,255,0.12); }

.hero-cell { grid-column: 1 / 3; grid-row: 1 / 3; padding: 40px; justify-content: flex-end; }
.date { font-size: 12px; color: rgba(255,255,255,0.3); letter-spacing: 0.08em; margin-bottom: 16px; }
.slogan { font-size: clamp(28px, 4vw, 44px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; }

.clock-cell { text-align: center; justify-content: center; align-items: center; }
.label { font-size: 11px; color: rgba(255,255,255,0.25); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
.clock { font-family: "SF Mono","Fira Code",monospace; font-size: clamp(28px, 4vw, 40px); font-weight: 300; }

.weather-cell { text-align: center; justify-content: center; align-items: center; }
.w-info { font-size: 18px; font-weight: 600; }
.w-loc { font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 4px; }
.dim { opacity: 0.3; }

.card-cell { cursor: pointer; }
.card-cell:hover { transform: translateY(-2px); }
.icon { font-size: 24px; margin-bottom: 12px; }
.card-cell h3 { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
.card-cell p { font-size: 12px; color: rgba(255,255,255,0.4); }

.footer-cell { justify-content: center; align-items: center; font-size: 12px; color: rgba(255,255,255,0.2); }

@media(max-width:640px){
  .grid { grid-template-columns: 1fr 1fr; }
  .hero-cell { grid-column: 1 / 3; }
}
</style>
