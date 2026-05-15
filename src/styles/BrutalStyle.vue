<script setup lang="ts">
import { ref } from 'vue'
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()

const darkMode = ref(false)
const notifications = ref(true)
const progress = ref(68)
const tags = ['Vue', 'TypeScript', 'Node.js', 'Python', 'Docker', 'Linux']
const selectedTag = ref('Vue')
</script>

<template>
<div class="page" :class="{dark:darkMode}">
  <section class="hero">
    <p class="date">{{ date }}</p>
    <h1 class="slogan">EXPLORE · CREATE · SHARE</h1>
    <div class="clock">{{ time }}</div>
    <p class="weather"><span v-if="desc">淮北 :: {{ desc }} {{ temp }}</span><span v-else>LOADING...</span></p>
  </section>

  <section class="toggles">
    <h2>设置</h2>
    <div class="row">
      <span>深色模式</span>
      <button class="switch" :class="{on:darkMode}" @click="darkMode=!darkMode"><span class="knob"></span></button>
    </div>
    <div class="row">
      <span>通知</span>
      <button class="switch" :class="{on:notifications}" @click="notifications=!notifications"><span class="knob"></span></button>
    </div>
  </section>

  <section class="progress-sec">
    <h2>项目进度</h2>
    <div class="prog-wrap">
      <div class="prog-bar"><div class="prog-fill" :style="{width:progress+'%'}"></div></div>
      <span class="prog-num">{{ progress }}%</span>
    </div>
  </section>

  <section class="tags-sec">
    <h2>技术栈</h2>
    <div class="tags">
      <button v-for="t in tags" :key="t" class="tag" :class="{active:selectedTag===t}" @click="selectedTag=t">{{ t }}</button>
    </div>
  </section>

  <section class="cards">
    <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
      <span class="icon">{{ c.icon }}</span>
      <h3>{{ c.title }}</h3>
      <p>{{ c.desc }}</p>
      <span class="cta">ENTER →</span>
    </a>
  </section>

  <section class="cta-sec">
    <button class="big-btn">开始探索</button>
    <button class="big-btn outline">了解更多</button>
  </section>

  <footer><p>© 2026 PORTAL</p></footer>
</div>
</template>

<style scoped>
.page{background:#f5f0e8;color:#1a1a1a;min-height:100vh;padding-top:calc(44px+60px);transition:background 0.3s,color 0.3s}
.page.dark{background:#1a1a1a;color:#f5f0e8}
.page.dark .switch{background:#333}
.page.dark .tag{background:#333;border-color:#555;color:#f5f0e8}
.page.dark .card{background:#222;border-color:#444;color:#f5f0e8}
.page.dark .big-btn{background:#f5f0e8;color:#1a1a1a}

.hero{text-align:center;padding:0 20px 60px;max-width:720px;margin:0 auto}
.date{font-size:14px;color:#666;letter-spacing:0.08em;margin-bottom:16px}
.slogan{font-size:clamp(28px,4vw,48px);font-weight:900;letter-spacing:0.05em;line-height:1.2;margin-bottom:20px}
.clock{font-family:"SF Mono",monospace;font-size:clamp(32px,5vw,48px);font-weight:700;line-height:1;margin-bottom:16px}
.weather{font-size:14px;color:#666}

.toggles,.progress-sec,.tags-sec{max-width:720px;margin:0 auto;padding:0 20px 32px}
h2{font-size:18px;font-weight:800;text-transform:uppercase;margin-bottom:16px;letter-spacing:0.05em}
.row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:2px solid #ddd;font-size:15px}
.switch{width:52px;height:28px;border-radius:0;border:3px solid #1a1a1a;background:#fff;position:relative;cursor:pointer;transition:background 0.2s}
.switch.on{background:#ff6b35}
.knob{position:absolute;top:2px;left:2px;width:18px;height:18px;background:#1a1a1a;transition:transform 0.2s}
.switch.on .knob{transform:translateX(24px);background:#fff}

.prog-wrap{display:flex;align-items:center;gap:12px}
.prog-bar{flex:1;height:16px;border:3px solid #1a1a1a;background:#fff;overflow:hidden}
.prog-fill{height:100%;background:#ff6b35;transition:width 0.5s}
.prog-num{font-size:20px;font-weight:900}

.tags{display:flex;flex-wrap:wrap;gap:8px}
.tag{padding:8px 16px;border:3px solid #1a1a1a;background:#fff;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.15s;text-transform:uppercase}
.tag:hover,.tag.active{background:#1a1a1a;color:#fff}

.cards{max-width:720px;margin:0 auto;padding:0 20px 32px;display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.card{padding:24px;border:3px solid #1a1a1a;background:#fff;box-shadow:6px 6px 0 #1a1a1a;transition:all 0.15s;text-decoration:none;color:#1a1a1a}
.card:hover{transform:translate(3px,3px);box-shadow:3px 3px 0 #1a1a1a}
.icon{font-size:24px;display:block;margin-bottom:10px}
.card h3{font-size:15px;font-weight:800;margin-bottom:4px;text-transform:uppercase}
.card p{font-size:12px;color:#666;margin-bottom:12px}
.cta{font-size:12px;font-weight:800;color:#ff6b35}

.cta-sec{max-width:720px;margin:0 auto;padding:0 20px 48px;display:flex;gap:12px;flex-wrap:wrap}
.big-btn{padding:16px 32px;border:3px solid #1a1a1a;background:#ff6b35;color:#fff;font-size:16px;font-weight:800;cursor:pointer;transition:all 0.15s;text-transform:uppercase}
.big-btn:hover{transform:translate(2px,2px)}
.big-btn.outline{background:transparent;color:#1a1a1a}

footer{text-align:center;padding:40px 20px 80px;font-size:13px;color:#999;letter-spacing:0.1em}
@media(max-width:640px){.cards{grid-template-columns:1fr}}
</style>
