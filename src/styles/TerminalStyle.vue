<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()

const lines = ref<{type:string,text:string}[]>([
  { type: 'out', text: 'Portal OS v2.0.0 — Type "help" for commands' },
  { type: 'out', text: '' },
])
const input = ref('')
const el = ref<HTMLElement|null>(null)

const cmds: Record<string, ()=>string> = {
  help: () => 'COMMANDS: help, whoami, date, weather, ls, cat <file>, clear',
  whoami: () => 'guest@portal',
  date: () => date.value,
  weather: () => desc ? `${desc}, ${temp}` : 'fetching...',
  ls: () => cards.map(c => c.title.toLowerCase().replace(/\s/g,'-')).join('  '),
  uname: () => 'PortalOS 2.0.0 x86_64 Vue/3',
  uptime: () => '42 days, 3:14',
  hostname: () => 'portal.local',
}
function exec() {
  const raw = input.value.trim()
  if (!raw) return
  lines.value.push({ type: 'in', text: `$ ${raw}` })
  const [cmd, ...args] = raw.split(' ')
  if (cmd === 'clear') { lines.value = []; input.value = ''; return }
  if (cmd === 'cat') {
    const f = args[0]
    const c = cards.find(x => x.title.toLowerCase().replace(/\s/g,'-') === f)
    lines.value.push({ type: 'out', text: c ? `${c.title}: ${c.desc}` : `cat: ${f}: No such file` })
  } else if (cmds[cmd]) {
    lines.value.push({ type: 'out', text: cmds[cmd]() })
  } else {
    lines.value.push({ type: 'err', text: `command not found: ${cmd}` })
  }
  input.value = ''
  nextTick(() => { if (el.value) el.value.scrollTop = el.value.scrollHeight })
}
</script>

<template>
<div class="page">
  <div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span class="title">portal@home:~</span></div>
  <div class="term" ref="el">
    <div class="info">
      <p>USER: guest | HOST: portal.local | TIME: {{ time }}</p>
      <p v-if="desc">WEATHER: 淮北 {{ desc }} {{ temp }}</p>
      <p>─────────────────────────────────────</p>
    </div>
    <p v-for="(l,i) in lines" :key="i" :class="l.type">{{ l.text }}</p>
    <div class="input-line">
      <span class="prompt">guest@portal:~$</span>
      <input v-model="input" @keydown.enter="exec" autofocus />
    </div>
  </div>

  <div class="quick-links">
    <a v-for="c in cards" :key="c.title" :href="c.href" class="link">
      <span class="li">{{ c.icon }}</span>
      <span>{{ c.title }}</span>
    </a>
  </div>

  <footer><p>© 2026 portal</p></footer>
</div>
</template>

<style scoped>
.page{background:#0d1117;color:#c9d1d9;min-height:100vh;padding-top:44px;font-family:"Fira Code","SF Mono",monospace;font-size:13px}
.bar{background:#161b22;padding:8px 16px;border-bottom:1px solid #30363d;display:flex;align-items:center;gap:8px}
.dot{width:10px;height:10px;border-radius:50%}
.r{background:#ff5f57}.y{background:#febc2e}.g{background:#28c840}
.title{color:#8b949e;font-size:12px;margin-left:8px}

.term{height:calc(100vh - 44px - 160px);overflow-y:auto;padding:16px 20px;background:#0d1117}
.info{margin-bottom:12px;color:#484f58;font-size:12px}
.info p{margin-bottom:2px}
.out{color:#c9d1d9;margin-bottom:2px}
.in{color:#7ee787;margin-bottom:2px}
.err{color:#f85149;margin-bottom:2px}
.input-line{display:flex;gap:8px;margin-top:4px}
.prompt{color:#7ee787;white-space:nowrap}
.input-line input{flex:1;background:none;border:none;color:#c9d1d9;font-family:inherit;font-size:13px;outline:none;caret-color:#58a6ff}

.quick-links{display:flex;gap:8px;padding:12px 20px;background:#161b22;border-top:1px solid #30363d;overflow-x:auto}
.link{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:6px;background:#21262d;color:#c9d1d9;text-decoration:none;font-size:12px;white-space:nowrap;transition:background 0.15s}
.link:hover{background:#30363d}
.li{font-size:14px}

footer{text-align:center;padding:16px;font-size:11px;color:#484f58}
</style>
