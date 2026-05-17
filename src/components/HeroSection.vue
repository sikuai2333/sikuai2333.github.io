<script setup lang="ts">
import { useTime } from '@/composables/useTime'
import { useWeather } from '@/composables/useWeather'
import { useQuotes } from '@/composables/useQuotes'
import { useCountdown } from '@/composables/useCountdown'
import { ref, onMounted, onUnmounted } from 'vue'

const { time, date, weekday } = useTime()
const { weather } = useWeather()
const { current: quote, refresh: nextQuote } = useQuotes()
const { remaining, isOvertime, percent } = useCountdown(18, 0)

const showError = ref(false)
let errorTimer: ReturnType<typeof setInterval>
onMounted(() => {
  errorTimer = setInterval(() => {
    showError.value = true
    setTimeout(() => { showError.value = false }, 3500)
  }, 12000)
  setTimeout(() => {
    showError.value = true
    setTimeout(() => { showError.value = false }, 3500)
  }, 6000)
})
onUnmounted(() => clearInterval(errorTimer))
</script>

<template>
  <section class="hero">
    <div class="hero-art">
      <svg viewBox="0 0 500 420" class="desk-svg" preserveAspectRatio="xMidYMid meet">

        <!-- === 显示器（远处，在人头上方） === -->
        <rect x="120" y="10" width="260" height="160" rx="6" fill="#1a1a1a"/>
        <rect x="127" y="17" width="246" height="146" rx="3" :fill="showError ? '#c0392b' : '#1e1e2e'" class="screen-bg"/>

        <!-- 正常：代码 -->
        <g v-if="!showError">
          <text font-family="'Courier New',monospace" font-size="11" fill="#a6e3a1">
            <tspan x="137" y="35">function init() {</tspan>
            <tspan x="147" y="50">  const data = await fetch('/api');</tspan>
            <tspan x="147" y="65">  if (!data.ok) throw Error();</tspan>
            <tspan x="147" y="80">  return data.json();</tspan>
            <tspan x="137" y="95">}</tspan>
            <tspan x="137" y="110">const r = init();</tspan>
            <tspan x="137" y="125">console.log(r);</tspan>
            <tspan x="137" y="140">render(r); // ...</tspan>
          </text>
          <rect x="210" y="132" width="7" height="13" fill="#a6e3a1" class="cursor"/>
        </g>

        <!-- 错误：红屏 -->
        <g v-if="showError" class="red-flash">
          <text x="250" y="80" text-anchor="middle" fill="white" font-size="52" font-weight="900" font-family="'Courier New',monospace">502</text>
          <text x="250" y="115" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-size="16" font-weight="700" font-family="'Courier New',monospace">BAD GATEWAY</text>
          <text x="250" y="150" text-anchor="middle" font-size="28">😵</text>
        </g>

        <!-- 显示器支架（露一点） -->
        <rect x="232" y="170" width="36" height="5" rx="2" fill="#555"/>
        <rect x="245" y="175" width="10" height="12" fill="#555"/>

        <!-- === 桌面边缘（只露一条边） === -->
        <rect x="-20" y="192" width="540" height="8" rx="2" fill="#f0f0eb" stroke="#1a1a1a" stroke-width="2.5"/>

        <!-- === 火柴人背影（半身，放大） === -->

        <!-- 后脑勺（大） -->
        <circle cx="250" cy="290" r="38" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="3.5"/>
        <!-- 头发纹理（几条线） -->
        <path d="M230 275 Q250 268 270 275" fill="none" stroke="#444" stroke-width="1.5"/>
        <path d="M228 282 Q250 276 272 282" fill="none" stroke="#444" stroke-width="1"/>

        <!-- 耳朵 -->
        <ellipse cx="212" cy="290" rx="5" ry="9" fill="none" stroke="#1a1a1a" stroke-width="2.5"/>
        <ellipse cx="288" cy="290" rx="5" ry="9" fill="none" stroke="#1a1a1a" stroke-width="2.5"/>

        <!-- 脖子 -->
        <line x1="240" y1="326" x2="238" y2="340" stroke="#1a1a1a" stroke-width="4"/>
        <line x1="260" y1="326" x2="262" y2="340" stroke="#1a1a1a" stroke-width="4"/>

        <!-- 肩膀（宽） -->
        <line x1="180" y1="348" x2="320" y2="348" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/>

        <!-- 后背（只看到上半截） -->
        <line x1="250" y1="340" x2="250" y2="420" stroke="#1a1a1a" stroke-width="4.5" stroke-linecap="round"/>

        <!-- === 左臂+左手 === -->
        <line x1="180" y1="348" x2="150" y2="310" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round" class="upper-arm-l"/>
        <line x1="150" y1="310" x2="145" y2="205" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" class="forearm-l"/>
        <!-- 左手（键盘上） -->
        <ellipse cx="145" cy="202" rx="8" ry="6" fill="#1a1a1a" class="hand-l"/>

        <!-- === 右臂+右手 === -->
        <line x1="320" y1="348" x2="350" y2="310" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round" class="upper-arm-r"/>
        <line x1="350" y1="310" x2="355" :y2="showError ? 198 : 205" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" class="forearm-r"/>
        <!-- 右手 -->
        <ellipse :cx="355" :cy="showError ? 195 : 202" rx="8" ry="6" fill="#1a1a1a" class="hand-r"/>

        <!-- 砸桌效果 -->
        <g v-if="showError" class="slam-fx">
          <line x1="345" y1="192" x2="330" y2="185" stroke="#1a1a1a" stroke-width="2" opacity="0.5"/>
          <line x1="355" y1="190" x2="355" y2="178" stroke="#1a1a1a" stroke-width="2" opacity="0.5"/>
          <line x1="365" y1="192" x2="380" y2="185" stroke="#1a1a1a" stroke-width="2" opacity="0.5"/>
        </g>

      </svg>
    </div>

    <!-- 文字区 -->
    <div class="hero-text">
      <h1 class="hero-slogan">
        <span class="slogan-main">996是福报</span>
        <span class="slogan-divider">|</span>
        <span class="slogan-sub">2333是态度</span>
      </h1>
      <div class="hero-info">
        <span class="info-item">📅 {{ date }} {{ weekday }}</span>
        <span class="info-item" v-if="weather">{{ weather.icon }} {{ weather.city }} {{ weather.temp }}°C {{ weather.desc }}</span>
        <span class="info-item">🕐 {{ time }}</span>
      </div>
      <p class="hero-quote" @click="nextQuote">
        "{{ quote }}"
        <span class="quote-hint">点击换一条 ↻</span>
      </p>
      <div class="countdown-box" :class="{ overtime: isOvertime }">
        <div class="countdown-label">{{ isOvertime ? '🎉 已加班' : '⏰ 距离下班' }}</div>
        <div class="countdown-time">{{ remaining }}</div>
        <div class="countdown-bar">
          <div class="countdown-fill" :style="{ width: Math.min(percent, 100) + '%' }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 32px 24px; max-width: 650px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.hero-art { width: 100%; max-width: 500px; }
.desk-svg { width: 100%; height: auto; }

.screen-bg { transition: fill 0.4s ease; }
.cursor { animation: blink 0.7s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.red-flash { animation: flashIn 0.3s ease-out; }
@keyframes flashIn { 0%{opacity:0} 100%{opacity:1} }

/* 502时右手砸桌过渡 */
.forearm-r { transition: all 0.3s cubic-bezier(0.68,-0.55,0.27,1.55); }
.hand-r { transition: all 0.3s cubic-bezier(0.68,-0.55,0.27,1.55); }
.slam-fx { animation: slamWave 0.4s ease-out; }
@keyframes slamWave { 0%{opacity:0;transform:scale(0.5)} 50%{opacity:1;transform:scale(1.3)} 100%{opacity:0;transform:scale(1.6)} }

.hero-text { text-align: center; width: 100%; max-width: 480px; display: flex; flex-direction: column; align-items: center; gap: 14px; }
.hero-slogan { font-size: clamp(24px, 5vw, 40px); font-weight: 900; line-height: 1.2; }
.slogan-main { color: var(--accent); }
.slogan-divider { color: var(--muted); margin: 0 8px; font-weight: 400; }
.slogan-sub { color: #6c63ff; }
.hero-info { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; font-size: 13px; color: var(--muted); }
.hero-quote { font-size: 13px; color: var(--muted); font-style: italic; cursor: pointer; padding: 10px 16px; background: rgba(0,0,0,0.03); border-left: 3px solid var(--accent); text-align: left; width: 100%; }
.hero-quote:hover { background: rgba(0,0,0,0.06); }
.quote-hint { display: block; font-size: 10px; color: #bbb; font-style: normal; margin-top: 3px; }
.countdown-box { width: 100%; padding: 14px 18px; background: var(--card-bg); border: var(--border-w) solid var(--border); box-shadow: var(--shadow-sm); text-align: center; }
.countdown-box.overtime { border-color: var(--success); background: #f0fff4; }
.countdown-label { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
.countdown-time { font-size: clamp(28px, 5vw, 48px); font-weight: 900; font-variant-numeric: tabular-nums; color: var(--accent); line-height: 1.1; }
.overtime .countdown-time { color: var(--success); }
.countdown-bar { margin-top: 8px; height: 4px; background: #e0e0e0; border-radius: 2px; overflow: hidden; }
.countdown-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width 1s linear; }
.overtime .countdown-fill { background: var(--success); }

@media (max-width: 768px) { .hero { padding: 20px 14px; } .hero-info { gap: 6px; font-size: 11px; } }
</style>
