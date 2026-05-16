<script setup lang="ts">
import { ref, computed } from 'vue'

const salary = ref(8000)
const workHours = ref(9) // 996 = 每天至少9h
const workDays = ref(26) // 996单休

const hourlyRate = computed(() => {
  const h = salary.value / (workHours.value * workDays.value)
  return h.toFixed(1)
})

// 会议成本计算器
const meetingPeople = ref(5)
const meetingMins = ref(30)
const avgSalary = ref(10000)
const meetingCost = computed(() => {
  const perMin = avgSalary.value / (9 * 26) / 60
  return Math.round(meetingPeople.value * meetingMins.value * perMin)
})

// 通勤成本
const commuteDays = ref(22)
const commuteCost = ref(15)
const commuteTime = ref(45)
const yearlyCommuteCost = computed(() => commuteDays.value * commuteCost.value * 12)
const yearlyCommuteHours = computed(() => Math.round(commuteDays.value * commuteTime.value * 2 * 12 / 60))

// 退休倒计时
const birthYear = ref(1995)
const retireAge = ref(65)
const daysToRetire = computed(() => {
  const now = new Date()
  const retireDate = new Date(now.getFullYear() + (retireAge.value - (now.getFullYear() - birthYear.value)), 0, 1)
  const diff = retireDate.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / 86400000))
})

// 加班时长
const overtimeHours = computed(() => {
  const now = new Date()
  const target = new Date(now)
  target.setHours(18, 0, 0, 0)
  const diff = now.getTime() - target.getTime()
  if (diff <= 0) return null
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  return { h, m }
})
</script>

<template>
  <section class="tools" id="tools">
    <div class="section-header">
      <h2 class="section-title">🧰 实用工具</h2>
      <p class="section-desc">算清楚你的时间值多少钱</p>
    </div>

    <div class="tools-grid">
      <!-- 真实时薪 -->
      <div class="tool-card brutal-card">
        <div class="tool-icon">💰</div>
        <h3>真实时薪计算器</h3>
        <div class="tool-inputs">
          <label>
            <span>月薪</span>
            <input type="number" v-model.number="salary" min="1000" step="500" />
            <span class="unit">元</span>
          </label>
          <label>
            <span>日工时</span>
            <input type="number" v-model.number="workHours" min="8" max="16" />
            <span class="unit">h</span>
          </label>
        </div>
        <div class="tool-result">
          <span class="result-value">¥{{ hourlyRate }}</span>
          <span class="result-label">/小时</span>
        </div>
        <p class="tool-comment">一杯奶茶都要工作半小时 ☕</p>
      </div>

      <!-- 会议成本 -->
      <div class="tool-card brutal-card">
        <div class="tool-icon">🤝</div>
        <h3>会议成本计算器</h3>
        <div class="tool-inputs">
          <label>
            <span>参会人数</span>
            <input type="number" v-model.number="meetingPeople" min="1" max="50" />
            <span class="unit">人</span>
          </label>
          <label>
            <span>会议时长</span>
            <input type="number" v-model.number="meetingMins" min="5" step="5" />
            <span class="unit">分钟</span>
          </label>
        </div>
        <div class="tool-result">
          <span class="result-value">¥{{ meetingCost.toLocaleString() }}</span>
          <span class="result-label">这场会的成本</span>
        </div>
        <p class="tool-comment">能买{{ Math.floor(meetingCost / 15) }}杯奶茶了 🧋</p>
      </div>

      <!-- 通勤成本 -->
      <div class="tool-card brutal-card">
        <div class="tool-icon">🚇</div>
        <h3>通勤成本计算器</h3>
        <div class="tool-inputs">
          <label>
            <span>单程费用</span>
            <input type="number" v-model.number="commuteCost" min="0" step="1" />
            <span class="unit">元</span>
          </label>
          <label>
            <span>单程时间</span>
            <input type="number" v-model.number="commuteTime" min="5" step="5" />
            <span class="unit">分钟</span>
          </label>
        </div>
        <div class="tool-result">
          <span class="result-value">¥{{ yearlyCommuteCost.toLocaleString() }}</span>
          <span class="result-label">每年通勤费用</span>
        </div>
        <p class="tool-comment">每年花{{ yearlyCommuteHours }}小时在路上 🚶</p>
      </div>

      <!-- 退休倒计时 -->
      <div class="tool-card brutal-card">
        <div class="tool-icon">🏖️</div>
        <h3>退休倒计时</h3>
        <div class="tool-inputs">
          <label>
            <span>出生年份</span>
            <input type="number" v-model.number="birthYear" min="1960" max="2010" />
          </label>
          <label>
            <span>退休年龄</span>
            <input type="number" v-model.number="retireAge" min="50" max="75" />
          </label>
        </div>
        <div class="tool-result">
          <span class="result-value">{{ daysToRetire.toLocaleString() }}</span>
          <span class="result-label">天</span>
        </div>
        <p class="tool-comment">还有{{ Math.round(daysToRetire / 365) }}年，加油 💪</p>
      </div>

      <!-- 加班统计 -->
      <div class="tool-card brutal-card" v-if="overtimeHours">
        <div class="tool-icon">🔥</div>
        <h3>加班实时统计</h3>
        <div class="tool-result overtime-result">
          <span class="result-value">{{ overtimeHours.h }}h {{ overtimeHours.m }}min</span>
          <span class="result-label">今日已加班</span>
        </div>
        <p class="tool-comment">老板又省钱了 🤑</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tools {
  padding: 48px 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.section-header {
  margin-bottom: 32px;
}
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.tool-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.tool-icon {
  font-size: 32px;
  line-height: 1;
}
.tool-card h3 {
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.tool-inputs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.tool-inputs label {
  flex: 1;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
}
.tool-inputs input {
  padding: 8px 10px;
  border: 2px solid var(--border);
  background: var(--bg);
  font-size: 16px;
  font-weight: 700;
  outline: none;
  width: 100%;
}
.tool-inputs input:focus {
  border-color: var(--accent);
}
.unit {
  font-size: 11px;
  color: #aaa;
}
.tool-result {
  padding: 12px 16px;
  background: var(--fg);
  color: var(--bg);
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.overtime-result {
  background: var(--danger);
}
.result-value {
  font-size: 28px;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}
.result-label {
  font-size: 13px;
  opacity: 0.8;
}
.tool-comment {
  font-size: 13px;
  color: var(--muted);
  font-style: italic;
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
