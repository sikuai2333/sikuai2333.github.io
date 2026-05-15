<script setup lang="ts">
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()
</script>

<template>
<div class="cyber">
  <div class="grid-bg"></div>
  <section class="hero">
    <p class="date">{{ date }}</p>
    <h1 class="slogan" data-text="Explore · Create · Share">Explore · Create · Share</h1>
    <div class="clock">{{ time }}</div>
    <p class="weather"><span v-if="desc">淮北 ▸ {{ desc }} {{ temp }}</span><span v-else>扫描中…</span></p>
  </section>
  <section class="cards">
    <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
      <div class="corner tl"></div><div class="corner tr"></div><div class="corner bl"></div><div class="corner br"></div>
      <span class="icon">{{ c.icon }}</span>
      <h3>{{ c.title }}</h3>
      <p>{{ c.desc }}</p>
    </a>
  </section>
  <footer><p>© 2026 // SYSTEM ONLINE</p></footer>
</div>
</template>

<style scoped>
.cyber{background:#0a0a12;color:#e0e0e0;min-height:100vh;padding-top:calc(44px+80px);position:relative;overflow:hidden}
.grid-bg{position:fixed;inset:0;background-image:linear-gradient(rgba(0,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.03) 1px,transparent 1px);background-size:40px 40px}
.hero{text-align:center;padding:0 20px 80px;max-width:720px;margin:0 auto;position:relative;z-index:1}
.date{font-size:13px;color:#ff00aa;letter-spacing:0.15em;margin-bottom:20px;font-family:"Fira Code",monospace}
.slogan{font-size:clamp(32px,5vw,56px);font-weight:900;letter-spacing:0.05em;line-height:1.1;margin-bottom:24px;color:#00ffff;text-shadow:0 0 30px rgba(0,255,255,0.4),2px 2px 0 #ff00aa;position:relative}
.slogan::after{content:attr(data-text);position:absolute;left:2px;top:2px;color:#ff00aa;opacity:0.5;z-index:-1}
.clock{font-family:"Fira Code",monospace;font-size:clamp(36px,6vw,56px);font-weight:300;color:#00ffff;text-shadow:0 0 20px rgba(0,255,255,0.3);line-height:1;margin-bottom:20px}
.weather{font-size:14px;color:#ff00aa;font-family:"Fira Code",monospace;letter-spacing:0.05em}
.cards{max-width:720px;margin:0 auto;padding:0 20px 60px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px;position:relative;z-index:1}
.card{padding:28px;background:rgba(0,255,255,0.02);border:1px solid rgba(0,255,255,0.15);position:relative;transition:all 0.3s;text-decoration:none;color:#e0e0e0}
.card:hover{background:rgba(0,255,255,0.06);box-shadow:0 0 30px rgba(0,255,255,0.1),inset 0 0 30px rgba(0,255,255,0.03)}
.corner{position:absolute;width:8px;height:8px;border-color:#00ffff;border-style:solid}
.tl{top:-1px;left:-1px;border-width:2px 0 0 2px}
.tr{top:-1px;right:-1px;border-width:2px 2px 0 0}
.bl{bottom:-1px;left:-1px;border-width:0 0 2px 2px}
.br{bottom:-1px;right:-1px;border-width:0 2px 2px 0}
.icon{font-size:24px;display:block;margin-bottom:12px}
.card h3{font-size:15px;font-weight:700;margin-bottom:4px;letter-spacing:0.05em;color:#00ffff}
.card p{font-size:12px;color:rgba(224,224,224,0.4)}
footer{position:relative;z-index:1;text-align:center;padding:40px 20px calc(60px+44px);font-size:11px;color:rgba(0,255,255,0.2);font-family:"Fira Code",monospace;letter-spacing:0.1em}
@media(max-width:640px){.cards{grid-template-columns:1fr}}
</style>
