<script setup lang="ts">
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()
</script>

<template>
<div class="term">
  <div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span class="title">portal@home:~</span></div>
  <div class="body">
    <p class="line"><span class="prompt">$</span> date</p>
    <p class="output">{{ date }}</p>
    <p class="line"><span class="prompt">$</span> time</p>
    <p class="output big">{{ time }}</p>
    <p class="line"><span class="prompt">$</span> weather --location huaibei</p>
    <p class="output"><span v-if="desc">{{ desc }}, {{ temp }}</span><span v-else>fetching...</span></p>
    <p class="line"><span class="prompt">$</span> ls ~/links/</p>
    <div class="grid">
      <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
        <span class="f">{{ c.icon }} {{ c.title }}/</span>
        <span class="d">{{ c.desc }}</span>
      </a>
    </div>
    <p class="line"><span class="prompt">$</span> <span class="cursor">_</span></p>
  </div>
  <footer><p>© 2026 portal</p></footer>
</div>
</template>

<style scoped>
.term{background:#0d1117;color:#c9d1d9;min-height:100vh;padding-top:calc(44px+24px);font-family:"Fira Code","SF Mono",monospace;font-size:14px}
.bar{background:#161b22;padding:8px 16px;border-bottom:1px solid #30363d;display:flex;align-items:center;gap:8px;max-width:720px;margin:0 auto;border-radius:8px 8px 0 0}
.dot{width:10px;height:10px;border-radius:50%}
.r{background:#ff5f57}.y{background:#febc2e}.g{background:#28c840}
.title{color:#8b949e;font-size:12px;margin-left:8px}
.body{max-width:720px;margin:0 auto;padding:24px 20px;background:#0d1117;border-left:1px solid #21262d;border-right:1px solid #21262d}
.line{color:#8b949e;margin-bottom:4px}
.prompt{color:#7ee787;margin-right:8px}
.output{color:#c9d1d9;margin-bottom:16px;padding-left:20px}
.big{font-size:clamp(28px,5vw,48px);color:#58a6ff;font-weight:300}
.grid{display:flex;flex-direction:column;gap:4px;margin-bottom:16px;padding-left:20px}
.card{display:flex;flex-direction:column;gap:2px;padding:8px 12px;text-decoration:none;color:#c9d1d9;border-left:2px solid #30363d;transition:all 0.15s}
.card:hover{border-left-color:#58a6ff;background:rgba(88,166,255,0.05)}
.f{color:#7ee787;font-size:14px}
.d{color:#8b949e;font-size:12px}
.cursor{animation:blink 1s step-end infinite}
@keyframes blink{50%{opacity:0}}
footer{text-align:center;padding:40px 20px calc(60px+44px);font-size:12px;color:#484f58;max-width:720px;margin:0 auto}
</style>
