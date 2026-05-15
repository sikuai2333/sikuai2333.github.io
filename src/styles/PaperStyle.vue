<script setup lang="ts">
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()
</script>

<template>
<div class="paper">
  <section class="hero">
    <p class="date">{{ date }}</p>
    <h1 class="slogan">Explore · Create · Share</h1>
    <div class="clock">{{ time }}</div>
    <p class="weather"><span v-if="desc">淮北 · {{ desc }} {{ temp }}</span><span v-else>获取中…</span></p>
  </section>
  <section class="cards">
    <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
      <span class="icon">{{ c.icon }}</span>
      <h3>{{ c.title }}</h3>
      <p>{{ c.desc }}</p>
      <span class="arrow">→</span>
    </a>
  </section>
  <footer><p>© 2026 · Portal</p></footer>
</div>
</template>

<style scoped>
.paper{
  background:#f7f3eb;color:#3a3a3a;min-height:100vh;padding-top:calc(44px+80px);
  background-image:repeating-linear-gradient(transparent,transparent 31px,#e8e4dc 31px,#e8e4dc 32px);
  background-position:0 44px;
}
.hero{text-align:center;padding:0 20px 80px;max-width:640px;margin:0 auto}
.date{font-size:13px;color:#999;letter-spacing:0.1em;margin-bottom:20px}
.slogan{font-size:clamp(32px,5vw,52px);font-weight:800;letter-spacing:-0.02em;line-height:1.15;margin-bottom:24px;color:#2a2a2a;font-family:"ZCOOL KuaiLe","Comic Sans MS",cursive,sans-serif}
.clock{font-family:"Fira Code",monospace;font-size:clamp(32px,5vw,48px);font-weight:300;color:#888;line-height:1;margin-bottom:20px}
.weather{font-size:14px;color:#999}
.cards{max-width:640px;margin:0 auto;padding:0 20px 60px;display:flex;flex-direction:column;gap:12px}
.card{
  display:flex;align-items:center;gap:16px;padding:20px 24px;
  background:#fff;border:2px solid #e0dcd4;border-radius:4px;
  box-shadow:3px 3px 0 #e0dcd4;
  transition:all 0.15s;text-decoration:none;color:#3a3a3a;
}
.card:hover{transform:translate(1px,1px);box-shadow:2px 2px 0 #e0dcd4}
.icon{font-size:22px;flex-shrink:0}
.card h3{font-size:15px;font-weight:700;margin-bottom:2px}
.card p{font-size:13px;color:#888}
.arrow{margin-left:auto;font-size:18px;color:#ccc;transition:color 0.2s}
.card:hover .arrow{color:#3a3a3a}
footer{text-align:center;padding:40px 20px calc(60px+44px);font-size:13px;color:#ccc}
</style>
