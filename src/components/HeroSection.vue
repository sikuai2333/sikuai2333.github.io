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
      <svg viewBox="0 0 600 380" class="desk-svg" preserveAspectRatio="xMidYMid meet">

        <!-- ========== 远景层（屏幕，最后面） ========== -->

        <!-- 显示器支架 -->
        <rect x="272" y="185" width="56" height="5" rx="2" fill="#555"/>
        <rect x="295" y="168" width="10" height="17" fill="#555"/>

        <!-- 显示器外框 -->
        <rect x="165" y="32" width="270" height="140" rx="5" fill="#1a1a1a"/>

        <!-- 屏幕内容区 -->
        <rect x="171" y="38" width="258" height="128" rx="2" :fill="showError ? '#c0392b' : '#1e1e2e'" class="screen-bg"/>

        <!-- 正常：代码滚动 -->
        <g v-if="!showError" class="code-scroll">
          <text font-family="'Courier New',monospace" font-size="11" fill="#a6e3a1">
            <tspan x="181" y="56">function init() {</tspan>
            <tspan x="191" y="70">  const data = await fetch('/api');</tspan>
            <tspan x="191" y="84">  if (!data.ok) throw Error();</tspan>
            <tspan x="191" y="98">  return data.json();</tspan>
            <tspan x="181" y="112">}</tspan>
            <tspan x="181" y="126">const r = init();</tspan>
            <tspan x="181" y="140">console.log(r);</tspan>
            <tspan x="181" y="154">render(r); // ...</tspan>
          </text>
          <rect x="245" y="146" width="7" height="13" fill="#a6e3a1" class="cursor"/>
        </g>

        <!-- 错误：红屏 -->
        <g v-if="showError" class="red-flash">
          <text x="300" y="95" text-anchor="middle" fill="white" font-size="48" font-weight="900" font-family="'Courier New',monospace">502</text>
          <text x="300" y="125" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-size="15" font-weight="700" font-family="'Courier New',monospace">BAD GATEWAY</text>
          <text x="300" y="155" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="26">😵</text>
        </g>

        <!-- ========== 中景层（桌子+键盘） ========== -->

        <!-- 桌面（透视梯形，延伸到画面外） -->
        <polygon points="-50,260 650,260 570,210 30,210" fill="#f5f5f0" stroke="#1a1a1a" stroke-width="3"/>
        <!-- 桌面厚度 -->
        <polygon points="-50,260 650,260 650,270 -50,270" fill="#e5e5e0" stroke="#1a1a1a" stroke-width="2"/>

        <!-- 键盘 -->
        <polygon points="225,242 375,242 365,228 235,228" fill="#e8e8e8" stroke="#1a1a1a" stroke-width="1.5"/>
        <!-- 键帽行 -->
        <rect x="240" y="230" width="120" height="4" rx="1" fill="#d0d0d0"/>
        <rect x="244" y="236" width="112" height="3" rx="1" fill="#d0d0d0"/>

        <!-- 桌面细节：鼠标 -->
        <ellipse cx="410" cy="238" rx="10" ry="7" fill="#e0e0e0" stroke="#1a1a1a" stroke-width="1.2"/>
        <line x1="410" y1="231" x2="410" y2="236" stroke="#1a1a1a" stroke-width="0.8"/>

        <!-- ========== 近景层（火柴人背影，最前面） ========== -->

        <!-- 椅子 -->
        <rect x="230" y="295" width="100" height="5" rx="2" fill="#888"/>
        <line x1="240" y1="300" x2="235" y2="365" stroke="#777" stroke-width="3"/>
        <line x1="320" y1="300" x2="325" y2="365" stroke="#777" stroke-width="3"/>
        <!-- 椅背 -->
        <rect x="232" y="265" width="96" height="4" rx="1" fill="#888"/>
        <line x1="235" y1="250" x2="235" y2="268" stroke="#888" stroke-width="3"/>
        <line x1="325" y1="250" x2="325" y2="268" stroke="#888" stroke-width="3"/>
        <!-- 椅轮 -->
        <circle cx="250" cy="370" r="5" fill="#999"/>
        <circle cx="310" cy="370" r="5" fill="#999"/>

        <!-- 身体（从背后看，坐在椅子上） -->
        <!-- 后脑勺 -->
        <circle cx="300" cy="220" r="20" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="3"/>
        <!-- 耳朵（两侧） -->
        <ellipse cx="280" cy="220" rx="4" ry="6" fill="none" stroke="#1a1a1a" stroke-width="2"/>
        <ellipse cx="320" cy="220" rx="4" ry="6" fill="none" stroke="#1a1a1a" stroke-width="2"/>

        <!-- 脖子 -->
        <line x1="295" y1="238" x2="293" y2="248" stroke="#1a1a1a" stroke-width="3"/>
        <line x1="305" y1="238" x2="307" y2="248" stroke="#1a1a1a" stroke-width="3"/>

        <!-- 后背（脊椎） -->
        <line x1="300" y1="248" x2="298" y2="300" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
        <!-- 肩膀 -->
        <line x1="268" y1="254" x2="332" y2="254" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>

        <!-- 左臂（正常打字 / 502时不变） -->
        <line x1="268" y1="254" x2="245" :y2="showError ? 248 : 240" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round" class="arm-left"/>
        <line x1="245" :y1="showError ? 248 : 240" x2="242" :y2="showError ? 245 : 232" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round" class="forearm-left"/>
        <!-- 左手 -->
        <circle :cx="242" :cy="showError ? 245 : 232" r="4" fill="#1a1a1a" class="hand-left"/>

        <!-- 右臂（正常打字 / 502时砸桌） -->
        <line x1="332" y1="254" x2="355" :y2="showError ? 250 : 240" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round" class="arm-right"/>
        <line x1="355" :y1="showError ? 250 : 240" x2="358" :y2="showError ? 260 : 232" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round" class="forearm-right"/>
        <!-- 右手 -->
        <circle :cx="358" :cy="showError ? 260 : 232" r="4" fill="#1a1a1a" class="hand-right"/>

        <!-- 砸桌效果：震波 -->
        <g v-if="showError" class="slam-effect">
          <line x1="350" y1="260" x2="340" y2="250" stroke="#1a1a1a" stroke-width="1.5" opacity="0.6"/>
          <line x1="358" y1="258" x2="358" y2="246" stroke="#1a1a1a" stroke-width="1.5" opacity="0.6"/>
          <line x1="366" y1="260" x2="376" y2="250" stroke="#1a1a1a" stroke-width="1.5" opacity="0.6"/>
        </g>

        <!-- 大腿（坐在椅子上） -->
        <line x1="290" y1="298" x2="265" y2="330" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="310" y1="298" x2="335" y2="330" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round"/>
        <!-- 小腿 -->
        <line x1="265" y1="330" x2="258" y2="360" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        <line x1="335" y1="330" x2="342" y2="360" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        <!-- 脚 -->
        <line x1="258" y1="360" x2="248" y2="365" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        <line x1="342" y1="360" x2="352" y2="365" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>

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
.hero { padding: 40px 24px 32px; max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.hero-art { width: 100%; max-width: 560px; }
.desk-svg { width: 100%; height: auto; }

.screen-bg { transition: fill 0.4s ease; }

/* 代码滚动 */
.code-scroll { animation: scrollUp 5s linear infinite; }
@keyframes scrollUp {
  0% { transform: translateY(0); }
  75% { transform: translateY(-30px); }
  100% { transform: translateY(-30px); }
}
.cursor { animation: blink 0.7s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* 红屏闪入 */
.red-flash { animation: flashIn 0.3s ease-out; }
@keyframes flashIn { 0%{opacity:0;transform:scale(0.98)} 100%{opacity:1;transform:scale(1)} }

/* 手臂打字动画（正常状态） */
.arm-left, .forearm-left, .hand-left { transition: all 0.15s ease; }
.arm-right, .forearm-right, .hand-right { transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55); }

/* 砸桌震波 */
.slam-effect { animation: slamWave 0.4s ease-out; }
@keyframes slamWave {
  0% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(1.5); }
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

@media (max-width: 768px) { .hero { padding: 24px 16px 20px; } .hero-info { gap: 6px; font-size: 12px; } }
</style>
