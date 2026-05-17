<script setup lang="ts">
import { ref } from 'vue'
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()

const statusCards = [
  { label: '服务器', value: '在线', ok: true, icon: '🟢' },
  { label: '构建', value: '通过', ok: true, icon: '✓' },
  { label: '部署', value: '3分钟前', ok: true, icon: '🚀' },
]
const activities = ref([
  { time: '刚刚', text: '推送了新提交 feat: aurora style', type: 'code' },
  { time: '15分钟前', text: '修复了导航栏固定定位问题', type: 'fix' },
  { time: '1小时前', text: '添加了6种新设计风格', type: 'feat' },
  { time: '3小时前', text: '配置了Cloudflare DNS', type: 'infra' },
  { time: '昨天', text: '初始化Vue3+Vite项目', type: 'init' },
])
const badges = ['Vue3', 'TypeScript', 'Vite', 'GitHub Pages', 'Cloudflare']
</script>

<template>
<div class="page">
  <div class="bg"><div class="glow g1"></div><div class="glow g2"></div></div>

  <section class="hero">
    <p class="date">{{ date }}</p>
    <h1 class="slogan">Explore · Create · Share</h1>
    <div class="clock">{{ time }}</div>
    <p class="weather"><span v-if="desc">淮北 · {{ desc }} {{ temp }}</span><span v-else>获取中…</span></p>
  </section>

  <section class="status-row">
    <div v-for="s in statusCards" :key="s.label" class="status-card" :class="{ok:s.ok}">
      <span class="si">{{ s.icon }}</span>
      <div><div class="sv">{{ s.value }}</div><div class="sl">{{ s.label }}</div></div>
    </div>
  </section>

  <section class="badges">
    <span v-for="b in badges" :key="b" class="badge">{{ b }}</span>
  </section>

  <section class="cards">
    <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
      <span class="icon">{{ c.icon }}</span>
      <h3>{{ c.title }}</h3>
      <p>{{ c.desc }}</p>
      <span class="link">进入 →</span>
    </a>
  </section>

  <section class="activity">
    <h2>最近活动</h2>
    <div class="timeline">
      <div v-for="a in activities" :key="a.time" class="act">
        <span class="act-time">{{ a.time }}</span>
        <span class="act-dot" :class="a.type"></span>
        <span class="act-text">{{ a.text }}</span>
      </div>
    </div>
  </section>

  <section class="actions">
    <button class="glow-btn">开始探索</button>
    <button class="glow-btn secondary">查看源码</button>
  </section>

  <footer><p>© 2026 · Portal</p></footer>
</div>
</template>

<style scoped>
.page{background:#0a0a0f;color:#f0ece4;min-height:100vh;padding-top:calc(44px+60px);position:relative;overflow:hidden}
.bg{position:fixed;inset:0;z-index:0}
.glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}
.g1{width:600px;height:600px;top:5%;left:15%;background:radial-gradient(circle,rgba(232,164,74,0.1),transparent 70%)}
.g2{width:500px;height:500px;bottom:10%;right:10%;background:radial-gradient(circle,rgba(110,198,230,0.06),transparent 70%)}

.hero{position:relative;z-index:1;text-align:center;padding:0 20px 60px;max-width:720px;margin:0 auto}
.date{font-size:14px;color:rgba(240,236,228,0.3);letter-spacing:0.08em;margin-bottom:16px}
.slogan{font-size:clamp(32px,5vw,52px);font-weight:700;letter-spacing:-0.03em;line-height:1.1;margin-bottom:20px;background:linear-gradient(135deg,#f0ece4,#e8a44a);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.clock{font-family:"SF Mono",monospace;font-size:clamp(36px,6vw,56px);font-weight:300;color:rgba(240,236,228,0.4);line-height:1;margin-bottom:16px}
.weather{font-size:15px;color:rgba(240,236,228,0.3)}

.status-row{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 32px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.status-card{padding:20px;border-radius:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:12px;transition:border-color 0.3s}
.status-card.ok{border-color:rgba(52,199,89,0.2)}
.si{font-size:20px}
.sv{font-size:14px;font-weight:600}
.sl{font-size:12px;color:rgba(240,236,228,0.35)}

.badges{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 32px;display:flex;flex-wrap:wrap;gap:8px}
.badge{padding:4px 12px;border-radius:20px;background:rgba(232,164,74,0.1);border:1px solid rgba(232,164,74,0.2);font-size:12px;color:#e8a44a}

.cards{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 32px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.card{padding:28px;border-radius:20px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1);text-decoration:none;color:#f0ece4}
.card:hover{transform:translateY(-4px);border-color:rgba(255,255,255,0.12);box-shadow:0 20px 60px rgba(0,0,0,0.4)}
.icon{font-size:28px;display:block;margin-bottom:12px}
.card h3{font-size:16px;font-weight:700;margin-bottom:4px}
.card p{font-size:13px;color:rgba(240,236,228,0.35);margin-bottom:14px}
.link{font-size:13px;font-weight:500;color:#e8a44a}

.activity{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 32px}
.activity h2{font-size:18px;font-weight:700;margin-bottom:20px}
.timeline{display:flex;flex-direction:column;gap:0}
.act{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04)}
.act-time{font-size:12px;color:rgba(240,236,228,0.25);width:80px;flex-shrink:0;text-align:right}
.act-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.act-dot.code{background:#e8a44a}.act-dot.fix{background:#34c759}.act-dot.feat{background:#5ac8fa}.act-dot.infra{background:#af52de}.act-dot.init{background:#ff6b35}
.act-text{font-size:14px;color:rgba(240,236,228,0.6)}

.actions{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 48px;display:flex;gap:12px;flex-wrap:wrap}
.glow-btn{padding:14px 28px;border-radius:12px;background:linear-gradient(135deg,#e8a44a,#d4943a);color:#0a0a0f;font-size:15px;font-weight:600;cursor:pointer;border:none;transition:all 0.25s;box-shadow:0 0 20px rgba(232,164,74,0.2)}
.glow-btn:hover{box-shadow:0 0 40px rgba(232,164,74,0.35);transform:translateY(-2px)}
.glow-btn.secondary{background:rgba(255,255,255,0.06);color:#f0ece4;box-shadow:none;border:1px solid rgba(255,255,255,0.1)}
.glow-btn.secondary:hover{background:rgba(255,255,255,0.1)}

footer{position:relative;z-index:1;text-align:center;padding:40px 20px 80px;font-size:13px;color:rgba(255,255,255,0.15)}
@media(max-width:640px){.cards,.status-row{grid-template-columns:1fr}}
</style>
