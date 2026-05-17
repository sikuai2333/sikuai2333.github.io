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
      <svg viewBox="0 0 500 400" class="desk-svg" preserveAspectRatio="xMidYMid meet">

        <!-- 背景桌子（横线，远景） -->
        <rect x="0" y="240" width="500" height="160" fill="#f5f5f0" stroke="none"/>
        <line x1="0" y1="240" x2="500" y2="240" stroke="#1a1a1a" stroke-width="2"/>

        <!-- 显示器（在火柴人手臂之间，较小） -->
        <rect x="180" y="170" width="140" height="75" rx="4" fill="#1a1a1a"/>
        <rect x="185" y="175" width="130" height="65" rx="2" :fill="showError ? '#c0392b' : '#1e1e2e'" class="screen-bg"/>
        <!-- 支架 -->
        <rect x="240" y="240" width="20" height="6" rx="2" fill="#555"/>

        <!-- 正常：代码 -->
        <g v-if="!showError">
          <text font-family="'Courier New',monospace" font-size="8" fill="#a6e3a1">
            <tspan x="193" y="190">function init() {</tspan>
            <tspan x="200" y="200">  const data = await fetch();</tspan>
            <tspan x="200" y="210">  if (!data.ok) throw Error();</tspan>
            <tspan x="200" y="220">  return data.json();</tspan>
            <tspan x="193" y="230">}</tspan>
          </text>
          <rect x="240" y="222" width="5" height="10" fill="#a6e3a1" class="cursor"/>
        </g>

        <!-- 错误：红屏 -->
        <g v-if="showError" class="red-flash">
          <text x="250" y="205" text-anchor="middle" fill="white" font-size="28" font-weight="900" font-family="'Courier New',monospace">502</text>
          <text x="250" y="225" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="10" font-weight="700" font-family="'Courier New',monospace">BAD GATEWAY</text>
          <text x="250" y="237" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="16">😵</text>
        </g>

        <!-- 键盘（显示器下方） -->
        <rect x="195" y="248" width="110" height="8" rx="2" fill="#e0e0e0" stroke="#1a1a1a" stroke-width="1.5"/>
        <line x1="200" y1="250" x2="300" y2="250" stroke="#ccc" stroke-width="0.5"/>
        <line x1="200" y1="253" x2="300" y2="253" stroke="#ccc" stroke-width="0.5"/>

        <!-- === 火柴人巨大背影（占60%画面） === -->

        <!-- 后背（从下往上） -->
        <line x1="250" y1="235" x2="250" y2="150" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/>

        <!-- 肩膀（宽） -->
        <line x1="150" y1="155" x2="350" y2="155" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/>

        <!-- 头（后脑勺，巨大） -->
        <circle cx="250" cy="80" r="50" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="4"/>
        <!-- 头发旋涡 -->
        <path d="M220,55 Q235,35 250,42 Q265,35 280,55" fill="none" stroke="#555" stroke-width="1.5"/>
        <path d="M225,60 Q240,45 260,45 Q275,45 280,58" fill="none" stroke="#555" stroke-width="1"/>
        <!-- 耳朵 -->
        <ellipse cx="198" cy="80" rx="7" ry="12" fill="none" stroke="#1a1a1a" stroke-width="2.5"/>
        <ellipse cx="302" cy="80" rx="7" ry="12" fill="none" stroke="#1a1a1a" stroke-width="2.5"/>

        <!-- 脖子 -->
        <line x1="240" y1="128" x2="238" y2="148" stroke="#1a1a1a" stroke-width="5"/>
        <line x1="260" y1="128" x2="262" y2="148" stroke="#1a1a1a" stroke-width="5"/>

        <!-- 左臂：从左肩到键盘左侧 -->
        <line x1="150" y1="155" x2="170" y2="190" stroke="#1a1a1a" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="170" y1="190" x2="200" y2="245" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="200" cy="245" r="5" fill="#1a1a1a" class="hand-left" :class="{ typing: !showError }"/>

        <!-- 右臂：从右肩到键盘右侧 -->
        <line x1="350" y1="155" x2="330" y2="190" stroke="#1a1a1a" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="330" y1="190" x2="300" y2="245" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="300" cy="245" r="5" fill="#1a1a1a" class="hand-right"
                :class="{ typing: !showError, slam: showError }"/>

        <!-- 砸桌震波 -->
        <g v-if="showError" class="slam-effect">
          <line x1="293" y1="242" x2="285" y2="232" stroke="#1a1a1a" stroke-width="2" opacity="0.5"/>
          <line x1="300" y1="240" x2="300" y2="228" stroke="#1a1a1a" stroke-width="2" opacity="0.5"/>
          <line x1="307" y1="242" x2="315" y2="232" stroke="#1a1a1a" stroke-width="2" opacity="0.5"/>
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
        <div class="countdown-bar"><div class="countdown-fill" :style="{ width: Math.min(percent,100)+'%' }"></div></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 40px 24px 32px; max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.hero-art { width: 100%; max-width: 500px; }
.desk-svg { width: 100%; height: auto; }
.screen-bg { transition: fill 0.4s ease; }
.code-scroll { animation: scrollUp 5s linear infinite; }
@keyframes scrollUp { 0%{transform:translateY(0)} 75%{transform:translateY(-20px)} 100%{transform:translateY(-20px)} }
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
