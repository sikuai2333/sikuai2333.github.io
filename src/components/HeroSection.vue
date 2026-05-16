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
      <svg viewBox="0 0 600 340" class="desk-svg" preserveAspectRatio="xMidYMid meet">
        <!-- === 桌面透视（正面微俯视） === -->
        <!-- 桌面顶部（近处，画面底部）- 白色桌面，黑色实线，延伸到屏幕外 -->
        <polygon points="-40,290 640,290 580,220 20,220" fill="#fafafa" stroke="#1a1a1a" stroke-width="3"/>
        <!-- 桌面厚度 -->
        <polygon points="-40,290 640,290 640,300 -40,300" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="2"/>

        <!-- === 显示器 === -->
        <!-- 显示器支架底座 -->
        <rect x="268" y="215" width="64" height="5" rx="2" fill="#333"/>
        <!-- 支架立柱 -->
        <rect x="294" y="195" width="12" height="20" fill="#444"/>
        <!-- 显示器外框（薄边框） -->
        <rect x="160" y="60" width="280" height="138" rx="6" fill="#1a1a1a" stroke="#1a1a1a" stroke-width="2"/>
        <!-- 屏幕内容区 -->
        <rect x="166" y="66" width="268" height="126" rx="3" :fill="showError ? '#e74c3c' : '#1e1e2e'" class="screen-bg"/>

        <!-- 正常状态：滚动代码 -->
        <g v-if="!showError" class="code-scroll">
          <text font-family="'Courier New',monospace" font-size="10" fill="#a6e3a1">
            <tspan x="176" y="82" class="scroll-line">function init() {</tspan>
            <tspan x="186" y="94" class="scroll-line">  const data = await fetch('/api');</tspan>
            <tspan x="186" y="106" class="scroll-line">  if (!data.ok) throw Error();</tspan>
            <tspan x="186" y="118" class="scroll-line">  return data.json();</tspan>
            <tspan x="176" y="130" class="scroll-line">}</tspan>
            <tspan x="176" y="142" class="scroll-line">const result = init();</tspan>
            <tspan x="176" y="154" class="scroll-line">console.log(result);</tspan>
            <tspan x="176" y="166" class="scroll-line">render(result);</tspan>
            <tspan x="176" y="178" class="scroll-line">// processing...</tspan>
          </text>
          <!-- 语法高亮色块 -->
          <text font-family="'Courier New',monospace" font-size="10">
            <tspan x="176" y="82" fill="#89b4fa">function</tspan>
            <tspan x="228" y="82" fill="#a6e3a1"> init</tspan>
            <tspan x="186" y="94" fill="#cdd6f4">  const </tspan>
            <tspan x="226" y="94" fill="#f9e2af">data</tspan>
            <tspan x="254" y="94" fill="#cdd6f4"> = </tspan>
            <tspan x="270" y="94" fill="#89b4fa">await</tspan>
            <tspan x="300" y="94" fill="#a6e3a1"> fetch</tspan>
            <tspan x="186" y="106" fill="#cdd6f4">  </tspan>
            <tspan x="198" y="106" fill="#89b4fa">if</tspan>
            <tspan x="210" y="106" fill="#cdd6f4"> (!data.ok) </tspan>
            <tspan x="274" y="106" fill="#89b4fa">throw</tspan>
          </text>
          <!-- 光标 -->
          <rect x="236" y="170" width="7" height="12" fill="#a6e3a1" class="cursor"/>
        </g>

        <!-- 错误状态：红屏 -->
        <g v-if="showError">
          <rect x="166" y="66" width="268" height="126" rx="3" fill="#e74c3c" class="red-flash"/>
          <text x="300" y="118" text-anchor="middle" fill="white" font-size="40" font-weight="900" font-family="'Courier New',monospace">502</text>
          <text x="300" y="145" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="14" font-weight="700" font-family="'Courier New',monospace">BAD GATEWAY</text>
          <text x="300" y="170" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="24">😵</text>
        </g>

        <!-- === 键盘 === -->
        <!-- 键盘主体（透视梯形） -->
        <polygon points="210,240 390,240 380,225 220,225" fill="#e0e0e0" stroke="#1a1a1a" stroke-width="2" rx="3"/>
        <!-- 键帽行 -->
        <rect x="228" y="228" width="144" height="4" rx="1" fill="#ccc" stroke="#aaa" stroke-width="0.5"/>
        <rect x="232" y="234" width="136" height="3" rx="1" fill="#ccc" stroke="#aaa" stroke-width="0.5"/>

        <!-- 桌面反光 -->
        <line x1="100" y1="270" x2="200" y2="265" stroke="#e0e0e0" stroke-width="1" opacity="0.4"/>
        <line x1="380" y1="265" x2="500" y2="270" stroke="#e0e0e0" stroke-width="1" opacity="0.4"/>
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
.hero {
  padding: 40px 24px 32px;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.hero-art { width: 100%; max-width: 550px; }
.desk-svg { width: 100%; height: auto; }

/* 屏幕背景色过渡 */
.screen-bg { transition: fill 0.4s; }

/* 代码滚动 */
.code-scroll { animation: scrollUp 4s linear infinite; }
@keyframes scrollUp {
  0% { transform: translateY(0); }
  80% { transform: translateY(-40px); }
  100% { transform: translateY(-40px); }
}

/* 光标闪烁 */
.cursor { animation: blink 0.7s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* 红屏闪现 */
.red-flash { animation: flashIn 0.3s ease-out; }
@keyframes flashIn {
  0% { opacity: 0; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

/* 文字区 */
.hero-text { text-align: center; width: 100%; max-width: 500px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
.hero-slogan { font-size: clamp(26px, 5vw, 44px); font-weight: 900; line-height: 1.2; }
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
.countdown-time { font-size: clamp(30px, 6vw, 52px); font-weight: 900; font-variant-numeric: tabular-nums; color: var(--accent); line-height: 1.1; }
.overtime .countdown-time { color: var(--success); }
.countdown-bar { margin-top: 10px; height: 5px; background: #e0e0e0; border-radius: 3px; overflow: hidden; }
.countdown-fill { height: 100%; background: var(--accent); border-radius: 3px; transition: width 1s linear; }
.overtime .countdown-fill { background: var(--success); }

@media (max-width: 768px) {
  .hero { padding: 24px 16px 20px; }
  .hero-info { gap: 6px; font-size: 12px; }
}
</style>
