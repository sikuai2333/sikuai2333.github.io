<script setup lang="ts">
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()
</script>

<template>
<div class="aurora">
  <div class="sky">
    <div class="wave w1"></div>
    <div class="wave w2"></div>
    <div class="wave w3"></div>
  </div>
  <section class="hero">
    <p class="date">{{ date }}</p>
    <h1 class="slogan">Explore · Create · Share</h1>
    <div class="clock">{{ time }}</div>
    <p class="weather"><span v-if="desc">淮北 · {{ desc }} {{ temp }}</span><span v-else>获取天气中…</span></p>
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
.aurora{background:#0b0f1a;color:#e8eaf0;min-height:100vh;padding-top:calc(44px+80px);position:relative;overflow:hidden}
.sky{position:fixed;inset:0;z-index:0}
.wave{position:absolute;width:200%;height:60%;left:-50%;filter:blur(80px);opacity:0.6;animation:drift 12s ease-in-out infinite alternate}
.w1{top:-20%;background:radial-gradient(ellipse at 30% 50%,rgba(80,200,120,0.3),transparent 60%);animation-duration:10s}
.w2{top:10%;background:radial-gradient(ellipse at 60% 50%,rgba(100,140,240,0.25),transparent 60%);animation-duration:14s;animation-delay:-3s}
.w3{top:30%;background:radial-gradient(ellipse at 40% 50%,rgba(180,100,220,0.2),transparent 60%);animation-duration:16s;animation-delay:-6s}
@keyframes drift{0%{transform:translateX(-5%)}100%{transform:translateX(5%)}}

.hero{position:relative;z-index:1;text-align:center;padding:0 20px 80px;max-width:720px;margin:0 auto}
.date{font-size:14px;color:rgba(232,234,240,0.35);letter-spacing:0.08em;margin-bottom:20px}
.slogan{font-size:clamp(36px,5vw,56px);font-weight:700;letter-spacing:-0.03em;line-height:1.1;margin-bottom:24px;background:linear-gradient(135deg,#50c878,#6488f0,#b464dc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.clock{font-family:"SF Mono","Fira Code",monospace;font-size:clamp(40px,7vw,64px);font-weight:300;color:rgba(232,234,240,0.45);line-height:1;margin-bottom:20px}
.weather{font-size:15px;color:rgba(232,234,240,0.35)}
.cards{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 60px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.card{padding:28px;border-radius:24px;background:rgba(255,255,255,0.04);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.06);transition:all 0.3s;text-decoration:none;color:#e8eaf0}
.card:hover{transform:translateY(-4px);background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.12)}
.icon{font-size:28px;display:block;margin-bottom:12px}
.card h3{font-size:16px;font-weight:600;margin-bottom:4px}
.card p{font-size:13px;color:rgba(232,234,240,0.4)}
footer{position:relative;z-index:1;text-align:center;padding:40px 20px calc(60px+44px);font-size:13px;color:rgba(255,255,255,0.2)}
@media(max-width:640px){.cards{grid-template-columns:1fr}}
</style>
