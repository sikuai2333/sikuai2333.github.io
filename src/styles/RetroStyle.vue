<script setup lang="ts">
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()
</script>

<template>
<div class="retro">
  <div class="scanlines"></div>
  <section class="hero">
    <p class="date">{{ date }}</p>
    <h1 class="slogan">EXPLORE · CREATE · SHARE</h1>
    <div class="clock">{{ time }}</div>
    <p class="weather"><span v-if="desc">淮北 :: {{ desc }} {{ temp }}</span><span v-else>LOADING...</span></p>
  </section>
  <section class="cards">
    <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
      <span class="icon">{{ c.icon }}</span>
      <h3>{{ c.title }}</h3>
      <p>{{ c.desc }}</p>
      <span class="cta">[ENTER]</span>
    </a>
  </section>
  <footer><p>(C) 2026 PORTAL SYSTEMS</p></footer>
</div>
</template>

<style scoped>
.retro{background:#1a0a2e;color:#00ff9f;min-height:100vh;padding-top:calc(44px+80px);position:relative;font-family:"Fira Code","Courier New",monospace}
.scanlines{position:fixed;inset:0;z-index:9;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)}
.hero{text-align:center;padding:0 20px 80px;max-width:720px;margin:0 auto;position:relative;z-index:1}
.date{font-size:14px;color:#ff6b9d;letter-spacing:0.15em;margin-bottom:20px}
.slogan{font-size:clamp(28px,4vw,48px);font-weight:700;letter-spacing:0.1em;line-height:1.2;margin-bottom:24px;text-shadow:0 0 20px rgba(0,255,159,0.5),0 0 40px rgba(0,255,159,0.2)}
.clock{font-size:clamp(36px,6vw,56px);font-weight:400;line-height:1;margin-bottom:20px;color:#ffcc00;text-shadow:0 0 15px rgba(255,204,0,0.4)}
.weather{font-size:14px;color:#00ff9f;letter-spacing:0.1em}
.cards{max-width:720px;margin:0 auto;padding:0 20px 60px;display:grid;grid-template-columns:repeat(2,1fr);gap:12px;position:relative;z-index:1}
.card{padding:24px;border:2px solid #00ff9f;background:rgba(0,255,159,0.03);transition:all 0.2s;text-decoration:none;color:#00ff9f}
.card:hover{background:rgba(0,255,159,0.1);box-shadow:0 0 20px rgba(0,255,159,0.2),inset 0 0 20px rgba(0,255,159,0.05)}
.icon{font-size:24px;display:block;margin-bottom:10px}
.card h3{font-size:14px;font-weight:700;margin-bottom:4px;letter-spacing:0.08em;text-transform:uppercase}
.card p{font-size:12px;color:rgba(0,255,159,0.5);margin-bottom:12px}
.cta{font-size:11px;color:#ffcc00;letter-spacing:0.15em}
footer{position:relative;z-index:1;text-align:center;padding:40px 20px calc(60px+44px);font-size:12px;color:rgba(0,255,159,0.3);letter-spacing:0.1em}
@media(max-width:640px){.cards{grid-template-columns:1fr}}
</style>
