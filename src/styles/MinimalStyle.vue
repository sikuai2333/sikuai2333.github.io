<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollReveal, revealCSS } from '../composables/useScrollReveal'
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()

useScrollReveal()

// 数字计数动画
const stats = ref([
  { label: '项目', value: 0, target: 12, suffix: '+' },
  { label: '文章', value: 0, target: 48, suffix: '' },
  { label: '访客', value: 0, target: 2400, suffix: '+' },
])
const skills = ref([
  { name: 'Vue / React', pct: 90 },
  { name: 'TypeScript', pct: 85 },
  { name: 'Node.js', pct: 78 },
  { name: 'Python', pct: 72 },
])
const form = ref({ name: '', email: '', msg: '' })
const sent = ref(false)

onMounted(() => {
  stats.value.forEach(s => {
    let cur = 0
    const step = Math.ceil(s.target / 40)
    const iv = setInterval(() => {
      cur += step
      if (cur >= s.target) { cur = s.target; clearInterval(iv) }
      s.value = cur
    }, 30)
  })
})

function submit() { if (form.value.name && form.value.email) sent.value = true }

// 3D tilt
function tilt(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  el.style.transform = `perspective(600px) rotateY(${x*6}deg) rotateX(${-y*6}deg) scale(1.02)`
}
function untilt(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)'
}
</script>

<template>
<div class="page">
  <div class="noise"></div>

  <section class="hero">
    <p class="date reveal">{{ date }}</p>
    <h1 class="slogan reveal reveal-delay-1">Explore · Create · Share</h1>
    <div class="clock reveal reveal-delay-2">{{ time }}</div>
    <p class="weather reveal reveal-delay-3"><span v-if="desc">淮北 · {{ desc }} {{ temp }}</span><span v-else>获取天气中…</span></p>
  </section>

  <section class="stats">
    <div v-for="s in stats" :key="s.label" class="stat reveal">
      <div class="num">{{ s.value }}{{ s.suffix }}</div>
      <div class="lbl">{{ s.label }}</div>
    </div>
  </section>

  <section class="cards">
    <a v-for="(c,i) in cards" :key="c.title" :href="c.href" class="card reveal"
       :class="'reveal-delay-'+((i%3)+1)"
       @mousemove="tilt" @mouseleave="untilt">
      <span class="icon">{{ c.icon }}</span>
      <div><h3>{{ c.title }}</h3><p>{{ c.desc }}</p></div>
      <span class="arrow">→</span>
    </a>
  </section>

  <section class="skills reveal">
    <h2>技能</h2>
    <div v-for="s in skills" :key="s.name" class="skill">
      <div class="skill-h"><span>{{ s.name }}</span><span>{{ s.pct }}%</span></div>
      <div class="bar"><div class="fill" :style="{width:s.pct+'%'}"></div></div>
    </div>
  </section>

  <section class="contact reveal">
    <h2>联系我</h2>
    <form v-if="!sent" @submit.prevent="submit">
      <input v-model="form.name" placeholder="姓名" required />
      <input v-model="form.email" type="email" placeholder="邮箱" required />
      <textarea v-model="form.msg" placeholder="留言" rows="3"></textarea>
      <button type="submit">发送</button>
    </form>
    <div v-else class="sent">✓ 已发送</div>
  </section>

  <footer><p>© 2026 · Portal</p></footer>
</div>
</template>

<style scoped>
.v-enter-from,.reveal{opacity:0;transform:translateY(24px);transition:opacity 0.6s cubic-bezier(0.16,1,0.3,1),transform 0.6s cubic-bezier(0.16,1,0.3,1)}
.reveal.revealed{opacity:1;transform:none}
.reveal-delay-1{transition-delay:0.1s}
.reveal-delay-2{transition-delay:0.2s}
.reveal-delay-3{transition-delay:0.3s}

.page{background:#fafafa;color:#1d1d1f;min-height:100vh;padding-top:var(--nav-height);position:relative;overflow:hidden}
.noise{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-repeat:repeat;background-size:256px}

.hero{position:relative;z-index:1;text-align:center;padding:0 20px 60px;max-width:1080px;margin:0 auto}
.date{font-size:14px;color:#86868b;letter-spacing:0.08em;margin-bottom:16px}
.slogan{font-size:clamp(32px,5vw,52px);font-weight:700;letter-spacing:-0.03em;line-height:1.1;margin-bottom:20px}
.clock{font-family:"SF Mono","Fira Code",monospace;font-size:clamp(36px,6vw,56px);font-weight:300;color:#86868b;line-height:1;margin-bottom:16px}
.weather{font-size:15px;color:#86868b}

.stats{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:0 20px 48px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center}
.stat{padding:24px;background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.04)}
.num{font-size:clamp(28px,4vw,40px);font-weight:700;color:#0071e3;margin-bottom:4px}
.lbl{font-size:13px;color:#86868b}

.cards{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:0 20px 48px;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.card{display:flex;align-items:center;gap:16px;padding:20px 24px;background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.04);transition:box-shadow 0.25s,transform 0.15s ease-out;text-decoration:none;color:#1d1d1f;transform-style:preserve-3d}
.card:hover{box-shadow:0 8px 30px rgba(0,0,0,0.08)}
.icon{font-size:24px;flex-shrink:0}
.card h3{font-size:15px;font-weight:600;margin-bottom:2px}
.card p{font-size:13px;color:#86868b}
.arrow{margin-left:auto;color:#0071e3;font-size:18px}

.skills{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:0 20px 48px}
.skills h2{font-size:20px;font-weight:700;margin-bottom:20px}
.skill{margin-bottom:16px}
.skill-h{display:flex;justify-content:space-between;font-size:14px;margin-bottom:6px}
.bar{height:6px;background:#e8e8ed;border-radius:3px;overflow:hidden}
.fill{height:100%;background:linear-gradient(90deg,#0071e3,#5ac8fa);border-radius:3px;transition:width 1s ease}

.contact{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:0 20px 48px}
.contact h2{font-size:20px;font-weight:700;margin-bottom:20px}
form{display:flex;flex-direction:column;gap:12px}
input,textarea{padding:12px 16px;border:1px solid #d2d2d7;border-radius:10px;font-size:15px;font-family:inherit;background:#fff;transition:border-color 0.2s}
input:focus,textarea:focus{outline:none;border-color:#0071e3}
button{padding:12px;background:#0071e3;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;transition:background 0.2s,transform 0.15s}
button:hover{background:#0077ed;transform:translateY(-1px)}
button:active{transform:translateY(0)}
.sent{text-align:center;padding:24px;font-size:18px;color:#34c759;font-weight:600}

footer{position:relative;z-index:1;text-align:center;padding:40px 20px 80px;font-size:13px;color:#86868b}
@media(max-width:768px){.hero .slogan{font-size:clamp(24px,5vw,36px)}.hero .clock{font-size:clamp(28px,6vw,40px)}.stats{grid-template-columns:repeat(3,1fr)}.cards{grid-template-columns:1fr}}@media(max-width:480px){.stats{grid-template-columns:1fr}.hero .slogan{font-size:22px}.hero .clock{font-size:28px}}
</style>
