<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()

const glitch = ref(false)
onMounted(() => { setInterval(() => { glitch.value = true; setTimeout(() => glitch.value = false, 200) }, 4000) })

const panels = [
  { label: 'CPU', value: 42, unit: '%' },
  { label: 'MEM', value: 67, unit: '%' },
  { label: 'NET', value: 128, unit: 'Mbps' },
  { label: 'DISK', value: 89, unit: '%' },
]
const logs = ref([
  '[03:14:07] SYSTEM BOOT',
  '[03:14:08] NET: CONNECTED',
  '[03:14:09] PORTAL: LOADED',
])
onMounted(() => {
  const msgs = ['SCAN: COMPLETE', 'SYNC: OK', 'AUTH: VERIFIED', 'CACHE: CLEARED']
  let i = 0
  setInterval(() => {
    const now = new Date()
    const t = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`
    logs.value.push(`[${t}] ${msgs[i % msgs.length]}`)
    if (logs.value.length > 8) logs.value.shift()
    i++
  }, 5000)
})

const hackInput = ref('')
const hackOutput = ref('')
function hack() {
  if (hackInput.value) {
    hackOutput.value = `> ACCESSING ${hackInput.value.toUpperCase()}... GRANTED`
    hackInput.value = ''
  }
}
</script>

<template>
<div class="page">
  <div class="grid-bg"></div>

  <section class="hero">
    <p class="date">{{ date }}</p>
    <h1 class="slogan" :class="{glitch}" data-text="Explore · Create · Share">Explore · Create · Share</h1>
    <div class="clock">{{ time }}</div>
    <p class="weather"><span v-if="desc">淮北 ▸ {{ desc }} {{ temp }}</span><span v-else>SCANNING…</span></p>
  </section>

  <section class="panels">
    <div v-for="p in panels" :key="p.label" class="panel">
      <div class="p-label">{{ p.label }}</div>
      <div class="p-bar"><div class="p-fill" :style="{width:p.value+'%'}"></div></div>
      <div class="p-val">{{ p.value }}<span class="p-unit">{{ p.unit }}</span></div>
    </div>
  </section>

  <section class="log-sec">
    <h2>SYSLOG</h2>
    <div class="log">
      <p v-for="(l,i) in logs" :key="i" class="log-line">{{ l }}</p>
    </div>
  </section>

  <section class="cards">
    <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
      <div class="corner tl"></div><div class="corner tr"></div><div class="corner bl"></div><div class="corner br"></div>
      <span class="icon">{{ c.icon }}</span>
      <h3>{{ c.title }}</h3>
      <p>{{ c.desc }}</p>
    </a>
  </section>

  <section class="hack-sec">
    <div class="hack-box">
      <input v-model="hackInput" @keydown.enter="hack" placeholder="输入目标..." />
      <button @click="hack">HACK</button>
    </div>
    <p v-if="hackOutput" class="hack-out">{{ hackOutput }}</p>
  </section>

  <footer><p>© 2026 // SYSTEM ONLINE</p></footer>
</div>
</template>

<style scoped>
.page{background:#0a0a12;color:#e0e0e0;min-height:100vh;padding-top:calc(44px+60px);position:relative;overflow:hidden;font-family:"Fira Code",monospace}
.grid-bg{position:fixed;inset:0;background-image:linear-gradient(rgba(0,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.025) 1px,transparent 1px);background-size:40px 40px}

.hero{position:relative;z-index:1;text-align:center;padding:0 20px 48px;max-width:720px;margin:0 auto}
.date{font-size:13px;color:#ff00aa;letter-spacing:0.15em;margin-bottom:16px}
.slogan{font-size:clamp(28px,4.5vw,48px);font-weight:900;letter-spacing:0.05em;line-height:1.1;margin-bottom:20px;color:#00ffff;text-shadow:0 0 30px rgba(0,255,255,0.4);position:relative}
.slogan.glitch{animation:glitchAnim 0.2s linear}
@keyframes glitchAnim{0%{transform:translate(2px,-1px)}25%{transform:translate(-2px,1px)}50%{transform:translate(1px,2px)}75%{transform:translate(-1px,-2px)}100%{transform:none}}
.slogan::after{content:attr(data-text);position:absolute;left:2px;top:2px;color:#ff00aa;opacity:0.5;z-index:-1}
.clock{font-size:clamp(32px,5vw,48px);font-weight:300;color:#00ffff;text-shadow:0 0 15px rgba(0,255,255,0.3);margin-bottom:12px}
.weather{font-size:14px;color:#ff00aa}

.panels{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 32px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.panel{padding:16px;background:rgba(0,255,255,0.02);border:1px solid rgba(0,255,255,0.1);border-radius:2px;text-align:center}
.p-label{font-size:11px;color:rgba(0,255,255,0.5);letter-spacing:0.1em;margin-bottom:8px}
.p-bar{height:3px;background:rgba(0,255,255,0.08);margin-bottom:8px;border-radius:2px;overflow:hidden}
.p-fill{height:100%;background:#00ffff;border-radius:2px;transition:width 1s}
.p-val{font-size:20px;font-weight:700;color:#00ffff}
.p-unit{font-size:10px;color:rgba(0,255,255,0.4);margin-left:2px}

.log-sec{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 32px}
.log-sec h2{font-size:13px;color:#ff00aa;letter-spacing:0.1em;margin-bottom:12px}
.log{padding:12px;background:rgba(0,0,0,0.3);border:1px solid rgba(0,255,255,0.08);max-height:160px;overflow-y:auto}
.log-line{font-size:11px;color:rgba(0,255,255,0.5);margin-bottom:2px}

.cards{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 32px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.card{padding:24px;background:rgba(0,255,255,0.015);border:1px solid rgba(0,255,255,0.1);position:relative;transition:all 0.3s;text-decoration:none;color:#e0e0e0}
.card:hover{background:rgba(0,255,255,0.04);box-shadow:0 0 20px rgba(0,255,255,0.08)}
.corner{position:absolute;width:6px;height:6px;border-color:#00ffff;border-style:solid}
.tl{top:-1px;left:-1px;border-width:1px 0 0 1px}
.tr{top:-1px;right:-1px;border-width:1px 1px 0 0}
.bl{bottom:-1px;left:-1px;border-width:0 0 1px 1px}
.br{bottom:-1px;right:-1px;border-width:0 1px 1px 0}
.icon{font-size:22px;display:block;margin-bottom:10px}
.card h3{font-size:14px;font-weight:700;margin-bottom:4px;color:#00ffff}
.card p{font-size:12px;color:rgba(224,224,224,0.35)}

.hack-sec{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 32px}
.hack-box{display:flex;gap:8px}
.hack-box input{flex:1;padding:10px 14px;background:rgba(0,0,0,0.3);border:1px solid rgba(0,255,255,0.15);color:#00ffff;font-family:inherit;font-size:13px;border-radius:2px}
.hack-box input:focus{outline:none;border-color:#00ffff}
.hack-box button{padding:10px 20px;background:#ff00aa;color:#fff;border:none;font-family:inherit;font-size:12px;font-weight:700;letter-spacing:0.1em;cursor:pointer}
.hack-out{margin-top:8px;font-size:12px;color:#00ffff}

footer{position:relative;z-index:1;text-align:center;padding:40px 20px 80px;font-size:11px;color:rgba(0,255,255,0.15);letter-spacing:0.1em}
@media(max-width:640px){.cards{grid-template-columns:1fr}.panels{grid-template-columns:repeat(2,1fr)}}
</style>
