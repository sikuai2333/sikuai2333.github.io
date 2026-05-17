<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()

const notifs = ref([
  { id: 1, title: '新消息', body: '你有 3 条未读消息', icon: '💬', show: true },
  { id: 2, title: '系统更新', body: 'v2.0 已发布', icon: '🔄', show: true },
])
function dismiss(id: number) { notifs.value = notifs.value.filter(n => n.id !== id) }

const playing = ref(false)
const progress = ref(35)

const bubbles = ref(Array.from({length:8}, (_, i) => ({
  id: i, size: 40 + Math.random() * 80,
  x: Math.random() * 100, y: Math.random() * 100,
  delay: Math.random() * 5, dur: 8 + Math.random() * 6,
})))
</script>

<template>
<div class="page">
  <div class="bg">
    <div v-for="b in bubbles" :key="b.id" class="bubble" :style="{
      width: b.size+'px', height: b.size+'px',
      left: b.x+'%', top: b.y+'%',
      animationDelay: b.delay+'s', animationDuration: b.dur+'s'
    }"></div>
  </div>

  <div class="notif-stack">
    <TransitionGroup name="notif">
      <div v-for="n in notifs" :key="n.id" class="notif">
        <span class="ni">{{ n.icon }}</span>
        <div><strong>{{ n.title }}</strong><p>{{ n.body }}</p></div>
        <button @click="dismiss(n.id)">✕</button>
      </div>
    </TransitionGroup>
  </div>

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
    </a>
  </section>

  <section class="player">
    <div class="player-bar">
      <div class="track"><strong>Midnight City</strong><span>M83</span></div>
      <div class="controls">
        <button class="ctrl">⏮</button>
        <button class="ctrl play" @click="playing=!playing">{{ playing ? '⏸' : '▶' }}</button>
        <button class="ctrl">⏭</button>
      </div>
      <div class="prog"><div class="prog-fill" :style="{width:progress+'%'}"></div></div>
    </div>
  </section>

  <footer><p>© 2026 · Portal</p></footer>
</div>
</template>

<style scoped>
.page{background:#0a0a1a;color:#fff;min-height:100vh;padding-top:calc(44px+60px);position:relative;overflow:hidden}
.bg{position:fixed;inset:0;z-index:0}
.bubble{position:absolute;border-radius:50%;background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.12);animation:float ease-in-out infinite alternate}
@keyframes float{0%{transform:translateY(0) scale(1)}100%{transform:translateY(-30px) scale(1.05)}}

.notif-stack{position:fixed;top:52px;right:16px;z-index:9999;display:flex;flex-direction:column;gap:8px}
.notif{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:14px;background:rgba(255,255,255,0.08);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);min-width:240px;transition:all 0.3s}
.notif strong{font-size:13px;display:block}
.notif p{font-size:12px;color:rgba(255,255,255,0.5);margin:0}
.ni{font-size:20px}
.notif button{margin-left:auto;background:none;border:none;color:rgba(255,255,255,0.3);cursor:pointer;font-size:14px}
.notif-enter-from,.notif-leave-to{opacity:0;transform:translateX(40px)}

.hero{position:relative;z-index:1;text-align:center;padding:0 20px 60px;max-width:720px;margin:0 auto}
.date{font-size:14px;color:rgba(255,255,255,0.35);letter-spacing:0.08em;margin-bottom:16px}
.slogan{font-size:clamp(32px,5vw,52px);font-weight:700;letter-spacing:-0.03em;line-height:1.1;margin-bottom:20px;background:linear-gradient(135deg,#fff,rgba(139,92,246,0.8));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.clock{font-family:"SF Mono",monospace;font-size:clamp(36px,6vw,56px);font-weight:300;color:rgba(255,255,255,0.5);line-height:1;margin-bottom:16px}
.weather{font-size:15px;color:rgba(255,255,255,0.35)}

.cards{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 48px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.card{padding:28px;border-radius:20px;background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);transition:all 0.3s;text-decoration:none;color:#fff}
.card:hover{background:rgba(255,255,255,0.1);transform:translateY(-4px)}
.icon{font-size:28px;display:block;margin-bottom:12px}
.card h3{font-size:16px;font-weight:600;margin-bottom:4px}
.card p{font-size:13px;color:rgba(255,255,255,0.45)}

.player{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 20px 48px}
.player-bar{padding:24px;border-radius:20px;background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08)}
.track{display:flex;align-items:baseline;gap:8px;margin-bottom:16px}
.track strong{font-size:15px}
.track span{font-size:13px;color:rgba(255,255,255,0.4)}
.controls{display:flex;justify-content:center;gap:20px;margin-bottom:16px}
.ctrl{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:14px;transition:background 0.2s}
.ctrl:hover{background:rgba(255,255,255,0.15)}
.play{width:44px;height:44px;background:rgba(139,92,246,0.3);font-size:16px}
.prog{height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden}
.prog-fill{height:100%;background:linear-gradient(90deg,#8b5cf6,#6366f1);border-radius:2px;transition:width 0.3s}

footer{position:relative;z-index:1;text-align:center;padding:40px 20px 80px;font-size:13px;color:rgba(255,255,255,0.2)}
@media(max-width:640px){.cards{grid-template-columns:1fr}}
</style>
