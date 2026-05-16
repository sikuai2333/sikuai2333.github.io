<script setup lang="ts">
import { useTime } from '@/composables/useTime'
import { useWeather } from '@/composables/useWeather'
import { useQuotes } from '@/composables/useQuotes'
import { useCountdown } from '@/composables/useCountdown'

const { time, date, weekday, isWeekend } = useTime()
const { weather } = useWeather()
const { current: quote, refresh: nextQuote } = useQuotes()
const { remaining, isOvertime, percent } = useCountdown(18, 0)

// 996进度条计算
const segments = 24
const activeColor = '#ff6b35'
</script>

<template>
  <section class="hero">
    <!-- 火柴人动画区 -->
    <div class="hero-art">
      <svg viewBox="0 0 400 200" class="stickman-svg">
        <!-- 桌子 -->
        <rect x="200" y="130" width="140" height="4" rx="2" fill="#1a1a1a"/>
        <rect x="210" y="134" width="4" height="40" fill="#1a1a1a"/>
        <rect x="326" y="134" width="4" height="40" fill="#1a1a1a"/>

        <!-- 显示器 -->
        <rect x="230" y="85" width="80" height="50" rx="3" fill="#1a1a1a" stroke="#1a1a1a" stroke-width="2"/>
        <rect x="234" y="89" width="72" height="42" rx="1" fill="#4a9eff"/>
        <!-- 屏幕上的代码行 -->
        <rect x="240" y="96" width="30" height="2" rx="1" fill="rgba(255,255,255,0.8)" class="code-line line1"/>
        <rect x="240" y="102" width="45" height="2" rx="1" fill="rgba(255,255,255,0.6)" class="code-line line2"/>
        <rect x="240" y="108" width="20" height="2" rx="1" fill="rgba(255,255,255,0.5)" class="code-line line3"/>
        <rect x="240" y="114" width="55" height="2" rx="1" fill="rgba(255,255,255,0.7)" class="code-line line4"/>
        <rect x="240" y="120" width="35" height="2" rx="1" fill="rgba(255,255,255,0.4)" class="code-line line5"/>
        <!-- 显示器支架 -->
        <rect x="265" y="135" width="10" height="4" fill="#1a1a1a"/>

        <!-- 火柴人 - 侧面坐姿 -->
        <!-- 头 -->
        <circle cx="190" cy="75" r="16" fill="none" stroke="#1a1a1a" stroke-width="3"/>
        <!-- 眼睛 - 困 -->
        <line x1="183" y1="73" x2="187" y2="73" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round"/>
        <line x1="193" y1="73" x2="197" y2="73" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round"/>
        <!-- 身体 -->
        <line x1="190" y1="91" x2="190" y2="125" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        <!-- 屁股坐在椅子上 -->
        <line x1="190" y1="125" x2="210" y2="130" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        <!-- 左手撑头 -->
        <line x1="190" y1="105" x2="175" y2="80" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        <line x1="175" y1="80" x2="182" y2="70" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        <!-- 右手放桌上 -->
        <line x1="190" y1="105" x2="230" y2="126" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        <!-- 左腿 -->
        <line x1="190" y1="125" x2="175" y2="160" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        <line x1="175" y1="160" x2="168" y2="170" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        <!-- 右腿 -->
        <line x1="190" y1="125" x2="210" y2="160" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>
        <line x1="210" y1="160" x2="205" y2="170" stroke="#1a1a1a" stroke-width="3" stroke-linecap="round"/>

        <!-- 椅子 -->
        <rect x="160" y="128" width="60" height="3" rx="1" fill="#888"/>
        <line x1="165" y1="131" x2="160" y2="170" stroke="#888" stroke-width="2"/>
        <line x1="215" y1="131" x2="220" y2="170" stroke="#888" stroke-width="2"/>
        <!-- 椅背 -->
        <line x1="160" y1="100" x2="160" y2="130" stroke="#888" stroke-width="3"/>

        <!-- 咖啡杯 -->
        <rect x="340" y="115" width="18" height="15" rx="2" fill="#c0392b" stroke="#1a1a1a" stroke-width="1.5"/>
        <path d="M358 119 Q366 122 358 127" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>
        <!-- 热气 -->
        <path d="M345 112 Q347 107 349 112" fill="none" stroke="#aaa" stroke-width="1" class="steam s1"/>
        <path d="M350 110 Q352 105 354 110" fill="none" stroke="#aaa" stroke-width="1" class="steam s2"/>

        <!-- 502气泡 (偶尔弹出) -->
        <g class="error-bubble">
          <rect x="290" y="40" width="80" height="30" rx="4" fill="#ff6b35" stroke="#1a1a1a" stroke-width="2"/>
          <polygon points="290,70 298,70 290,78" fill="#ff6b35" stroke="#1a1a1a" stroke-width="2"/>
          <rect x="288" y="68" width="14" height="4" fill="#ff6b35"/>
          <text x="330" y="60" text-anchor="middle" fill="white" font-size="13" font-weight="800">502 😵</text>
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
        <span class="quote-hint">点击换一条</span>
      </p>

      <!-- 下班倒计时 -->
      <div class="countdown-box" :class="{ overtime: isOvertime }">
        <div class="countdown-label">{{ isOvertime ? '🎉 已加班' : '⏰ 距离下班' }}</div>
        <div class="countdown-time">{{ remaining }}</div>
        <div class="countdown-bar">
          <div class="countdown-fill" :style="{ width: percent + '%' }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 48px 24px 32px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

/* SVG动画 */
.hero-art {
  width: 100%;
  max-width: 500px;
}
.stickman-svg { width: 100%; height: auto; }

/* 代码行闪烁 */
.code-line { animation: blink 2s infinite; }
.line1 { animation-delay: 0s; }
.line2 { animation-delay: 0.3s; }
.line3 { animation-delay: 0.6s; }
.line4 { animation-delay: 0.9s; }
.line5 { animation-delay: 1.2s; }
@keyframes blink {
  0%, 80%, 100% { opacity: 1; }
  40% { opacity: 0.3; }
}

/* 热气飘动 */
.steam { animation: steamFloat 2s infinite; }
.s2 { animation-delay: 0.8s; }
@keyframes steamFloat {
  0% { opacity: 0.6; transform: translateY(0); }
  50% { opacity: 0.3; transform: translateY(-6px); }
  100% { opacity: 0; transform: translateY(-12px); }
}

/* 502气泡 */
.error-bubble { animation: popIn 6s infinite; }
@keyframes popIn {
  0%, 70%, 100% { opacity: 0; transform: translateY(10px); }
  75%, 95% { opacity: 1; transform: translateY(0); }
}

/* 文字区 */
.hero-text {
  text-align: center;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.hero-slogan {
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 900;
  line-height: 1.2;
}
.slogan-main { color: var(--accent); }
.slogan-divider { color: var(--muted); margin: 0 8px; font-weight: 400; }
.slogan-sub { color: #6c63ff; }

.hero-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  font-size: 14px;
  color: var(--muted);
}

.hero-quote {
  font-size: 15px;
  color: var(--muted);
  font-style: italic;
  cursor: pointer;
  padding: 12px 20px;
  background: rgba(0,0,0,0.03);
  border-left: 3px solid var(--accent);
  text-align: left;
  width: 100%;
  transition: background 0.2s;
}
.hero-quote:hover { background: rgba(0,0,0,0.06); }
.quote-hint {
  display: block;
  font-size: 11px;
  color: #aaa;
  font-style: normal;
  margin-top: 4px;
}

/* 倒计时 */
.countdown-box {
  width: 100%;
  padding: 16px 20px;
  background: var(--card-bg);
  border: var(--border-w) solid var(--border);
  box-shadow: var(--shadow-sm);
  text-align: center;
}
.countdown-box.overtime {
  border-color: var(--success);
  background: #f0fff4;
}
.countdown-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}
.countdown-time {
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
  color: var(--accent);
  line-height: 1.1;
}
.overtime .countdown-time { color: var(--success); }
.countdown-bar {
  margin-top: 10px;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}
.countdown-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 3px;
  transition: width 1s linear;
}
.overtime .countdown-fill { background: var(--success); }

@media (max-width: 768px) {
  .hero { padding: 32px 16px 24px; }
  .hero-info { gap: 8px; font-size: 13px; }
}
</style>
