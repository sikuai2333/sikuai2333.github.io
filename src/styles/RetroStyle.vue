<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()

const booting = ref(true)
const bootLines = ref<string[]>([])
const bootSeq = [
  'BIOS v2.04 ... OK',
  'RAM: 4096 MB ... OK',
  'DISK: 256 GB SSD ... OK',
  'NET: eth0 ... CONNECTED',
  'LOADING PORTAL OS v2.0 ...',
  '> WELCOME',
]
onMounted(() => {
  bootSeq.forEach((line, i) => {
    setTimeout(() => { bootLines.value.push(line) }, 300 * (i + 1))
  })
  setTimeout(() => { booting.value = false }, 300 * (bootSeq.length + 2))
})

const input = ref('')
const history = ref<string[]>([])
function exec() {
  if (!input.value.trim()) return
  history.value.push('> ' + input.value)
  const cmd = input.value.trim().toLowerCase()
  if (cmd === 'help') history.value.push('COMMANDS: help, date, weather, clear')
  else if (cmd === 'date') history.value.push(date.value)
  else if (cmd === 'weather') history.value.push(desc ? `${desc} ${temp}` : 'N/A')
  else if (cmd === 'clear') history.value = []
  else history.value.push('UNKNOWN COMMAND')
  input.value = ''
}
</script>

<template>
<div class="page">
  <div class="scanlines"></div>

  <div v-if="booting" class="boot">
    <p v-for="(l,i) in bootLines" :key="i" class="boot-line">{{ l }}</p>
    <p class="cursor">_</p>
  </div>

  <div v-else class="main">
    <section class="hero">
      <pre class="ascii">
 ██╗  ██╗ ██████╗ ██████╗ ████████╗ █████╗ ██╗
 ██║  ██║██╔═══██╗██╔══██╗╚══██╔══╝██╔══██╗██║
 ███████║██║   ██║██████╔╝   ██║   ███████║██║
 ██╔══██║██║   ██║██╔══██╗   ██║   ██╔══██║██║
 ██║  ██║╚██████╔╝██║  ██║   ██║   ██║  ██║██║
 ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝</pre>
      <div class="clock">{{ time }}</div>
      <p class="meta">{{ date }} | 淮北 <span v-if="desc">{{ desc }} {{ temp }}</span></p>
    </section>

    <section class="terminal">
      <div class="term-body">
        <p v-for="(h,i) in history" :key="i" class="hist">{{ h }}</p>
        <div class="input-line">
          <span class="prompt">&gt;</span>
          <input v-model="input" @keydown.enter="exec" placeholder="type help..." autofocus />
        </div>
      </div>
    </section>

    <section class="cards">
      <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
        <span class="ci">{{ c.icon }}</span>
        <h3>{{ c.title }}</h3>
        <p>{{ c.desc }}</p>
        <span class="cta">[ENTER]</span>
      </a>
    </section>

    <footer><p>(C) 2026 PORTAL SYSTEMS</p></footer>
  </div>
</div>
</template>

<style scoped>
.page{background:#1a0a2e;color:#00ff9f;min-height:100vh;padding-top:calc(44px+24px);font-family:"Fira Code","Courier New",monospace;position:relative}
.scanlines{position:fixed;inset:0;z-index:9;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px)}

.boot{padding:40px 20px;font-size:14px}
.boot-line{margin-bottom:4px;animation:fadeIn 0.3s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.cursor{animation:blink 0.6s step-end infinite}
@keyframes blink{50%{opacity:0}}

.main{position:relative;z-index:1}
.hero{text-align:center;padding:0 20px 40px}
.ascii{font-size:clamp(5px,1.2vw,10px);line-height:1.1;color:#ff6b9d;text-shadow:0 0 10px rgba(255,107,157,0.4);margin-bottom:20px;overflow-x:auto}
.clock{font-size:clamp(32px,5vw,48px);color:#ffcc00;text-shadow:0 0 15px rgba(255,204,0,0.4);margin-bottom:8px}
.meta{font-size:13px;color:#00ff9f}

.terminal{max-width:720px;margin:0 auto;padding:0 20px 40px}
.term-body{padding:20px;background:rgba(0,0,0,0.4);border:1px solid rgba(0,255,159,0.15);border-radius:4px;min-height:120px}
.hist{font-size:13px;margin-bottom:4px;color:#00ff9f}
.input-line{display:flex;gap:8px;margin-top:8px}
.prompt{color:#ffcc00}
.input-line input{flex:1;background:none;border:none;color:#00ff9f;font-family:inherit;font-size:13px;outline:none}

.cards{max-width:720px;margin:0 auto;padding:0 20px 40px;display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.card{padding:24px;border:2px solid #00ff9f;background:rgba(0,255,159,0.02);transition:all 0.2s;text-decoration:none;color:#00ff9f}
.card:hover{background:rgba(0,255,159,0.08);box-shadow:0 0 20px rgba(0,255,159,0.15)}
.ci{font-size:24px;display:block;margin-bottom:10px}
.card h3{font-size:14px;font-weight:700;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.08em}
.card p{font-size:12px;color:rgba(0,255,159,0.45);margin-bottom:10px}
.cta{font-size:11px;color:#ffcc00}
footer{text-align:center;padding:40px 20px 80px;font-size:12px;color:rgba(0,255,159,0.2)}
@media(max-width:640px){.cards{grid-template-columns:1fr}}
</style>
