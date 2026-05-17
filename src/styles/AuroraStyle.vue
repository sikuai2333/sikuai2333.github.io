<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()

const particles = ref(Array.from({length:20}, (_, i) => ({
  id: i, x: Math.random()*100, y: Math.random()*100,
  size: 2 + Math.random()*4, speed: 10 + Math.random()*20,
  delay: Math.random()*10,
})))

const skills = [
  { name: '创意', pct: 92, color: '#50c878' },
  { name: '代码', pct: 88, color: '#6488f0' },
  { name: '设计', pct: 78, color: '#b464dc' },
]

const email = ref('')
const sent = ref(false)
</script>

<template>
<div class="page">
  <div class="sky">
    <div class="wave w1"></div>
    <div class="wave w2"></div>
    <div class="wave w3"></div>
    <div v-for="p in particles" :key="p.id" class="particle" :style="{
      left:p.x+'%', top:p.y+'%', width:p.size+'px', height:p.size+'px',
      animationDuration:p.speed+'s', animationDelay:p.delay+'s'
    }"></div>
  </div>

  <section class="hero">
    <p class="date">{{ date }}</p>
    <h1 class="slogan">Explore · Create · Share</h1>
    <div class="clock">{{ time }}</div>
    <p class="weather"><span v-if="desc">淮北 · {{ desc }} {{ temp }}</span><span v-else>获取中…</span></p>
  </section>

  <section class="skill-rings">
    <div v-for="s in skills" :key="s.name" class="ring-card">
      <svg viewBox="0 0 36 36" class="ring">
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2.5"/>
        <circle cx="18" cy="18" r="15.9" fill="none" :stroke="s.color" stroke-width="2.5"
          stroke-linecap="round" :stroke-dasharray="`${s.pct} ${100-s.pct}`" stroke-dashoffset="25"/>
      </svg>
      <div class="ring-info"><span class="ring-name">{{ s.name }}</span><span class="ring-pct">{{ s.pct }}%</span></div>
    </div>
  </section>

  <section class="cards">
    <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
      <span class="icon">{{ c.icon }}</span>
      <h3>{{ c.title }}</h3>
      <p>{{ c.desc }}</p>
    </a>
  </section>

  <section class="subscribe">
    <h2>保持联系</h2>
    <form v-if="!sent" @submit.prevent="sent=true">
      <input v-model="email" type="email" placeholder="your@email.com" required />
      <button type="submit">订阅</button>
    </form>
    <p v-else class="thanks">✓ 已订阅</p>
  </section>

  <footer><p>© 2026 · Portal</p></footer>
</div>
</template>

<style scoped>
.page{background:#0b0f1a;color:#e8eaf0;min-height:100vh;padding-top:calc(44px+60px);position:relative;overflow:hidden}
.sky{position:fixed;inset:0;z-index:0}
.wave{position:absolute;width:200%;height:60%;left:-50%;filter:blur(80px);opacity:0.5;animation:drift 12s ease-in-out infinite alternate}
.w1{top:-20%;background:radial-gradient(ellipse at 30% 50%,rgba(80,200,120,0.25),transparent 60%);animation-duration:10s}
.w2{top:10%;background:radial-gradient(ellipse at 60% 50%,rgba(100,140,240,0.2),transparent 60%);animation-duration:14s;animation-delay:-3s}
.w3{top:30%;background:radial-gradient(ellipse at 40% 50%,rgba(180,100,220,0.15),transparent 60%);animation-duration:16s;animation-delay:-6s}
@keyframes drift{0%{transform:translateX(-5%)}100%{transform:translateX(5%)}}
.particle{position:absolute;border-radius:50%;background:rgba(255,255,255,0.15);animation:floatUp linear infinite}
@keyframes floatUp{0%{transform:translateY(0);opacity:0}20%{opacity:1}80%{opacity:1}100%{transform:translateY(-100vh);opacity:0}}

.hero{position:relative;z-index:1;text-align:center;padding:0 20px 48px;max-width:720px;margin:0 auto}
.date{font-size:14px;color:rgba(232,234,240,0.3);letter-spacing:0.08em;margin-bottom:16px}
.slogan{font-size:clamp(32px,5vw,52px);font-weight:700;letter-spacing:-0.03em;line-height:1.1;margin-bottom:20px;background:linear-gradient(135deg,#50c878,#6488f0,#b464dc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.clock{font-family:"SF Mono",monospace;font-size:clamp(36px,6vw,56px);font-weight:300;color:rgba(232,234,240,0.4);line-height:1;margin-bottom:16px}
.weather{font-size:15px;color:rgba(232,234,240,0.3)}

.skill-rings{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 48px;display:flex;justify-content:center;gap:40px}
.ring-card{display:flex;flex-direction:column;align-items:center;gap:8px}
.ring{width:72px;height:72px}
.ring-info{display:flex;flex-direction:column;align-items:center}
.ring-name{font-size:13px;color:rgba(232,234,240,0.5)}
.ring-pct{font-size:18px;font-weight:700}

.cards{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 48px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.card{padding:28px;border-radius:24px;background:rgba(255,255,255,0.04);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.06);transition:all 0.3s;text-decoration:none;color:#e8eaf0}
.card:hover{transform:translateY(-4px);background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.12)}
.icon{font-size:28px;display:block;margin-bottom:12px}
.card h3{font-size:16px;font-weight:600;margin-bottom:4px}
.card p{font-size:13px;color:rgba(232,234,240,0.35)}

.subscribe{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 48px;text-align:center}
.subscribe h2{font-size:20px;font-weight:600;margin-bottom:16px}
form{display:flex;gap:8px;max-width:360px;margin:0 auto}
input{flex:1;padding:12px 16px;border-radius:16px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:#e8eaf0;font-size:14px;font-family:inherit}
input:focus{outline:none;border-color:rgba(80,200,120,0.4)}
button{padding:12px 24px;border-radius:16px;background:linear-gradient(135deg,#50c878,#6488f0);color:#fff;border:none;font-size:14px;font-weight:600;cursor:pointer}
.thanks{font-size:16px;color:#50c878}

footer{position:relative;z-index:1;text-align:center;padding:40px 20px 80px;font-size:13px;color:rgba(255,255,255,0.15)}
@media(max-width:640px){.cards{grid-template-columns:1fr}}
</style>
