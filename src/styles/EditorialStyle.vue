<script setup lang="ts">
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()
</script>

<template>
<div class="edit">
  <section class="hero">
    <p class="dateline">{{ date }}</p>
    <h1 class="slogan">Explore · Create · Share</h1>
    <div class="rule"></div>
    <div class="clock">{{ time }}</div>
    <p class="weather"><span v-if="desc">Huaibei — {{ desc }}, {{ temp }}</span><span v-else>Loading...</span></p>
  </section>
  <div class="rule2"></div>
  <section class="cards">
    <a v-for="(c,i) in cards" :key="c.title" :href="c.href" class="card">
      <span class="num">0{{ i+1 }}</span>
      <h3>{{ c.title }}</h3>
      <p>{{ c.desc }}</p>
    </a>
  </section>
  <footer><p>© 2026</p></footer>
</div>
</template>

<style scoped>
.edit{background:#faf8f5;color:#1a1a1a;min-height:100vh;padding-top:calc(44px+80px);font-family:"Georgia","Noto Serif SC","Times New Roman",serif}
.hero{text-align:center;padding:0 20px 60px;max-width:680px;margin:0 auto}
.dateline{font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#999;margin-bottom:24px}
.slogan{font-size:clamp(32px,5vw,56px);font-weight:400;letter-spacing:-0.02em;line-height:1.15;margin-bottom:24px;font-style:italic}
.rule{width:40px;height:1px;background:#1a1a1a;margin:0 auto 24px}
.clock{font-family:"SF Mono","Fira Code",monospace;font-size:clamp(28px,4vw,40px);font-weight:300;color:#666;margin-bottom:16px}
.weather{font-size:14px;color:#999;letter-spacing:0.05em}
.rule2{max-width:680px;margin:0 auto;height:1px;background:#ddd}
.cards{max-width:680px;margin:0 auto;padding:40px 20px 60px;display:grid;grid-template-columns:repeat(2,1fr);gap:40px}
.card{text-decoration:none;color:#1a1a1a;transition:opacity 0.2s}
.card:hover{opacity:0.7}
.num{font-size:48px;font-weight:300;color:#ddd;display:block;margin-bottom:8px;line-height:1}
.card h3{font-size:18px;font-weight:700;margin-bottom:6px;letter-spacing:-0.01em}
.card p{font-size:14px;color:#666;line-height:1.6}
footer{text-align:center;padding:40px 20px calc(60px+44px);font-size:12px;color:#ccc;letter-spacing:0.1em}
@media(max-width:640px){.cards{grid-template-columns:1fr;gap:32px}}
</style>
