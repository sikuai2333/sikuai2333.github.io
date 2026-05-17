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
      <svg viewBox="0 0 700 420" class="desk-svg" preserveAspectRatio="xMidYMid meet">

        <!-- ========================================= -->
        <!-- 45° 侧后方视角：                         -->
        <!-- 近景左下 = 火柴人大背影                   -->
        <!-- 远景右上 = 桌面+显示器+键盘               -->
        <!-- 火柴人占画面 ~60%，屏幕小且远             -->
        <!-- ========================================= -->

        <!-- === 桌面（透视平行四边形，近大远小） === -->
        <!-- 桌面从左下延伸到右上 -->
        <polygon points="0,380 700,280 700,220 0,310" fill="#f5f5f0" stroke="#1a1a1a" stroke-width="3"/>
        <!-- 桌面厚度（近侧） -->
        <polygon points="0,380 700,280 700,295 0,395" fill="#e5e5e0" stroke="#1a1a1a" stroke-width="2"/>

        <!-- 桌面远端边缘 -->
        <line x1="0" y1="310" x2="700" y2="220" stroke="#1a1a1a" stroke-width="1.5"/>

        <!-- === 显示器（在桌面远端，右上角区域） === -->
        <!-- 支架 -->
        <rect x="530" y="200" width="8" height="20" fill="#555" transform="rotate(-5, 534, 210)"/>
        <rect x="515" y="215" width="40" height="4" rx="2" fill="#555"/>
        <!-- 屏幕外框 -->
        <rect x="475" y="80" width="180" height="130" rx="5" fill="#1a1a1a" transform="rotate(-5, 565, 145)"/>
        <!-- 屏幕内容 -->
        <rect x="480" y="85" width="170" height="120" rx="2" :fill="showError ? '#c0392b' : '#1e1e2e'" transform="rotate(-5, 565, 145)" class="screen-bg"/>

        <!-- 正常：代码 -->
        <g v-if="!showError" transform="rotate(-5, 565, 145)">
          <text font-family="'Courier New',monospace" font-size="9" fill="#a6e3a1">
            <tspan x="490" y="102">function init() {</tspan>
            <tspan x="500" y="114">  const data = await fetch();</tspan>
            <tspan x="500" y="126">  if (!data.ok) throw Error();</tspan>
            <tspan x="500" y="138">  return data.json();</tspan>
            <tspan x="490" y="150">}</tspan>
            <tspan x="490" y="162">const r = init();</tspan>
            <tspan x="490" y="174">render(r);</tspan>
          </text>
          <rect x="540" y="166" width="6" height="11" fill="#a6e3a1" class="cursor"/>
        </g>

        <!-- 错误：红屏 -->
        <g v-if="showError" class="red-flash" transform="rotate(-5, 565, 145)">
          <text x="565" y="135" text-anchor="middle" fill="white" font-size="36" font-weight="900" font-family="'Courier New',monospace">502</text>
          <text x="565" y="160" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-size="12" font-weight="700" font-family="'Courier New',monospace">BAD GATEWAY</text>
          <text x="565" y="185" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="22">😵</text>
        </g>

        <!-- === 键盘（桌面上，显示器前方） === -->
        <polygon points="380,280 520,255 510,245 370,268" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="1.5"/>
        <rect x="385" y="260" width="115" height="4" rx="1" fill="#d0d0d0" transform="rotate(-5, 442, 262)"/>
        <rect x="388" y="266" width="110" height="3" rx="1" fill="#d0d0d0" transform="rotate(-5, 443, 268)"/>

        <!-- 鼠标 -->
        <ellipse cx="545" cy="260" rx="10" ry="6" fill="#e0e0e0" stroke="#1a1a1a" stroke-width="1"/>

        <!-- ============================================= -->
        <!-- === 火柴人巨大背影（左下，占60%画面） === -->
        <!-- ============================================= -->

        <!-- 椅子（在火柴人后面，先画） -->
        <rect x="120" y="280" width="160" height="6" rx="2" fill="#888" transform="rotate(5, 200, 283)"/>
        <line x1="135" y1="286" x2="125" y2="400" stroke="#777" stroke-width="4"/>
        <line x1="265" y1="286" x2="275" y2="400" stroke="#777" stroke-width="4"/>
        <!-- 椅背 -->
        <rect x="130" y="230" width="140" height="5" rx="1" fill="#888"/>
        <line x1="135" y1="200" x2="135" y2="234" stroke="#888" stroke-width="4"/>
        <line x1="265" y1="200" x2="265" y2="234" stroke="#888" stroke-width="4"/>
        <!-- 椅轮 -->
        <circle cx="150" cy="408" r="8" fill="#999"/>
        <circle cx="250" cy="408" r="8" fill="#999"/>

        <!-- 后背（从椅子到肩膀，粗线） -->
        <line x1="200" y1="280" x2="195" y2="195" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/>

        <!-- 头（后脑勺，巨大圆） -->
        <circle cx="200" cy="130" r="40" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="4"/>
        <!-- 头发纹理 -->
        <path d="M170,115 Q185,95 200,100 Q215,95 230,115" fill="none" stroke="#555" stroke-width="1.5"/>
        <path d="M175,120 Q190,105 210,105 Q225,105 230,118" fill="none" stroke="#555" stroke-width="1"/>
        <!-- 耳朵 -->
        <ellipse cx="158" cy="130" rx="6" ry="10" fill="none" stroke="#1a1a1a" stroke-width="2.5"/>
        <ellipse cx="242" cy="130" rx="6" ry="10" fill="none" stroke="#1a1a1a" stroke-width="2.5"/>

        <!-- 脖子 -->
        <line x1="190" y1="168" x2="188" y2="185" stroke="#1a1a1a" stroke-width="5"/>
        <line x1="210" y1="168" x2="212" y2="185" stroke="#1a1a1a" stroke-width="5"/>

        <!-- 肩膀（宽） -->
        <line x1="140" y1="195" x2="260" y2="195" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/>

        <!-- 左臂：伸向键盘 -->
        <line x1="140" y1="195" x2="200" y2="235" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
        <line x1="200" y1="235" x2="350" y2="265" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="350" cy="265" r="5" fill="#1a1a1a" class="hand-left" :class="{ typing: !showError }"/>

        <!-- 右臂：伸向键盘 -->
        <line x1="260" y1="195" x2="310" y2="240" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
        <line x1="310" y1="240" x2="430" y2="258" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round"
              :class="{ 'arm-slam': showError }"/>
        <circle cx="430" cy="258" r="5" fill="#1a1a1a" class="hand-right"
                :class="{ typing: !showError, slam: showError }"/>

        <!-- 砸桌震波 -->
        <g v-if="showError" class="slam-effect">
          <line x1="425" y1="255" x2="415" y2="245" stroke="#1a1a1a" stroke-width="2" opacity="0.5"/>
          <line x1="430" y1="252" x2="430" y2="240" stroke="#1a1a1a" stroke-width="2" opacity="0.5"/>
          <line x1="435" y1="255" x2="445" y2="245" stroke="#1a1a1a" stroke-width="2" opacity="0.5"/>
        </g>

        <!-- 大腿（坐在椅子上） -->
        <line x1="185" y1="278" x2="155" y2="340" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/>
        <line x1="215" y1="278" x2="245" y2="340" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/>
        <!-- 小腿 -->
        <line x1="155" y1="340" x2="145" y2="390" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
        <line x1="245" y1="340" x2="255" y2="390" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
        <!-- 脚 -->
        <line x1="145" y1="390" x2="130" y2="398" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
        <line x1="255" y1="390" x2="270" y2="398" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>

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
        <div class="countdown-bar"><div class="countdown-fill" :style="{ width: Math.min(percent,100)+'%' }"></div></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 40px 24px 32px; max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.hero-art { width: 100%; max-width: 600px; }
.desk-svg { width: 100%; height: auto; }
.screen-bg { transition: fill 0.4s ease; }

.code-scroll { animation: scrollUp 5s linear infinite; }
@keyframes scrollUp { 0%{transform:translateY(0)} 75%{transform:translateY(-25px)} 100%{transform:translateY(-25px)} }
.cursor { animation: blink 0.7s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.red-flash { animation: flashIn 0.3s; }
@keyframes flashIn { 0%{opacity:0} 100%{opacity:1} }

.typing { animation: typeMove 0.2s ease-in-out infinite alternate; }
@keyframes typeMove { 0%{transform:translateY(0)} 100%{transform:translateY(3px)} }
.slam { animation: slamDown 0.3s cubic-bezier(0.68,-0.55,0.27,1.55); }
@keyframes slamDown { 0%{transform:translateY(-15px)} 100%{transform:translateY(8px)} }
.slam-effect { animation: slamWave 0.4s ease-out; }
@keyframes slamWave { 0%{opacity:0;transform:scale(0.5)} 50%{opacity:1;transform:scale(1.2)} 100%{opacity:0;transform:scale(1.5)} }

.hero-text { text-align: center; width: 100%; max-width: 500px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
.hero-slogan { font-size: clamp(26px,5vw,44px); font-weight: 900; line-height: 1.2; }
.slogan-main { color: var(--accent); }
.slogan-divider { color: var(--muted); margin: 0 8px; font-weight: 400; }
.slogan-sub { color: #6c63ff; }
.hero-info { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; font-size: 14px; color: var(--muted); }
.hero-quote { font-size: 14px; color: var(--muted); font-style: italic; cursor: pointer; padding: 12px 18px; background: rgba(0,0,0,0.03); border-left: 3px solid var(--accent); text-align: left; width: 100%; }
.hero-quote:hover { background: rgba(0,0,0,0.06); }
.quote-hint { display: block; font-size: 11px; color: #bbb; font-style: normal; margin-top: 4px; }
.countdown-box { width: 100%; padding: 16px 20px; background: var(--card-bg); border: var(--border-w) solid var(--border); box-shadow: var(--shadow-sm); text-align: center; }
.countdown-box.overtime { border-color: var(--success); background: #f0fff4; }
.countdown-label { font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
.countdown-time { font-size: clamp(30px,6vw,52px); font-weight: 900; font-variant-numeric: tabular-nums; color: var(--accent); line-height: 1.1; }
.overtime .countdown-time { color: var(--success); }
.countdown-bar { margin-top: 10px; height: 5px; background: #e0e0e0; border-radius: 3px; overflow: hidden; }
.countdown-fill { height: 100%; background: var(--accent); border-radius: 3px; transition: width 1s linear; }
.overtime .countdown-fill { background: var(--success); }
@media (max-width: 768px) { .hero{padding:24px 16px 20px} .hero-info{gap:6px;font-size:12px} }
</style>
