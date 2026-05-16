<script setup lang="ts">
import { ref } from 'vue'

// === 加班彩票 ===
const lotteryNumbers = ref<number[]>([])
const lotteryResult = ref('')
const lotteryRolling = ref(false)
const rollLottery = () => {
  lotteryRolling.value = true
  lotteryResult.value = ''
  const interval = setInterval(() => {
    lotteryNumbers.value = Array.from({ length: 6 }, () => Math.floor(Math.random() * 33) + 1)
  }, 80)
  setTimeout(() => {
    clearInterval(interval)
    lotteryRolling.value = false
    lotteryResult.value = '又没中，继续加班吧 😭'
  }, 2000)
}

// === 请假借口 ===
const excuses = [
  '家里水管爆了，需要等人来修',
  '昨晚吃坏肚子了，今天一直在跑厕所',
  '猫把我的工牌藏起来了',
  '闹钟坏了，睡过头了',
  '楼下着火了，被困在楼里出不去',
  '身份证过期了要去补办',
  '手机掉马桶里了，去修手机',
  '老家来人了，要去接站',
  '快递要当面签收，必须本人在场',
  '眼睛发炎了，要去医院复查',
  '钥匙忘公司了，今天进不了家门',
  '被狗咬了要去打疫苗',
  '参加表哥婚礼',
  '家里老人身体不舒服要去陪诊',
  '办签证要去面签',
  '过敏了，满脸起疹子见不了人',
  '过敏原就在办公室（对同事过敏）',
  '我的AI助手建议我休息一天',
  '黄历说今天不宜上班',
  '星座运势说今天会和领导吵架',
]
const currentExcuse = ref('')
const excuseUsed = ref(new Set<number>())
const generateExcuse = () => {
  let idx: number
  do {
    idx = Math.floor(Math.random() * excuses.length)
  } while (excuseUsed.value.has(idx) && excuseUsed.value.size < excuses.length)
  excuseUsed.value.add(idx)
  if (excuseUsed.value.size >= excuses.length) excuseUsed.value.clear()
  currentExcuse.value = excuses[idx]
}

// === 今天吃什么 ===
const foods = [
  { name: '黄焖鸡', emoji: '🍗', risk: '可能会拉肚子' },
  { name: '兰州拉面', emoji: '🍜', risk: '又是面...' },
  { name: '沙县小吃', emoji: '🥟', risk: '经典永不过时' },
  { name: '麻辣烫', emoji: '🌶️', risk: '胃：你礼貌吗' },
  { name: '盖浇饭', emoji: '🍚', risk: '碳水炸弹' },
  { name: '麦当劳', emoji: '🍔', risk: '又是垃圾食品的一天' },
  { name: '螺蛳粉', emoji: '🍜', risk: '同事会恨你' },
  { name: '便当', emoji: '🍱', risk: '昨晚的剩菜' },
  { name: '泡面', emoji: '🍝', risk: '打工人的标配' },
  { name: '不吃', emoji: '😤', risk: '省钱修仙' },
]
const currentFood = ref<typeof foods[0] | null>(null)
const foodSpinning = ref(false)
const spinFood = () => {
  foodSpinning.value = true
  currentFood.value = null
  const interval = setInterval(() => {
    currentFood.value = foods[Math.floor(Math.random() * foods.length)]
  }, 100)
  setTimeout(() => {
    clearInterval(interval)
    foodSpinning.value = false
  }, 1500)
}

// === 职场舒适度 ===
const comfortQs = [
  { q: '今天准时下班了吗？', yes: 20, no: -10 },
  { q: '开会时打瞌睡了吗？', yes: -15, no: 5 },
  { q: '今天被@了吗？', yes: -20, no: 10 },
  { q: '午饭好吃吗？', yes: 10, no: -5 },
  { q: '今天摸鱼超过2小时了吗？', yes: 25, no: -5 },
  { q: '领导今天心情好吗？', yes: 15, no: -20 },
  { q: '今天有下午茶吗？', yes: 15, no: -5 },
  { q: '工位空调温度合适吗？', yes: 5, no: -10 },
]
const comfortStep = ref(-1)
const comfortScore = ref(0)
const comfortDone = ref(false)
const startComfort = () => {
  comfortStep.value = 0
  comfortScore.value = 0
  comfortDone.value = false
}
const answerComfort = (yes: boolean) => {
  const q = comfortQs[comfortStep.value]
  comfortScore.value += yes ? q.yes : q.no
  if (comfortStep.value >= comfortQs.length - 1) {
    comfortDone.value = true
  } else {
    comfortStep.value++
  }
}
const comfortLevel = () => {
  if (comfortScore.value >= 50) return { text: '天堂级', color: '#2d8a4e', emoji: '😇' }
  if (comfortScore.value >= 20) return { text: '还行吧', color: '#2980b9', emoji: '🙂' }
  if (comfortScore.value >= 0) return { text: '凑合过', color: '#f39c12', emoji: '😐' }
  if (comfortScore.value >= -30) return { text: '有点惨', color: '#e67e22', emoji: '😣' }
  return { text: '地狱级', color: '#d63031', emoji: '💀' }
}
</script>

<template>
  <section class="fun" id="fun">
    <div class="section-header">
      <h2 class="section-title">🎮 摸鱼娱乐</h2>
      <p class="section-desc">合理摸鱼，提升幸福感</p>
    </div>

    <div class="fun-grid">
      <!-- 加班彩票 -->
      <div class="fun-card brutal-card">
        <div class="fun-icon">🎰</div>
        <h3>加班彩票</h3>
        <div class="lottery-balls">
          <span v-for="(n, i) in (lotteryNumbers.length ? lotteryNumbers : [0,0,0,0,0,0])" :key="i"
                class="lottery-ball" :class="{ rolling: lotteryRolling }">
            {{ n || '?' }}
          </span>
        </div>
        <button class="brutal-btn" @click="rollLottery" :disabled="lotteryRolling">
          {{ lotteryRolling ? '开奖中...' : '🎲 开奖' }}
        </button>
        <p class="fun-result" v-if="lotteryResult">{{ lotteryResult }}</p>
      </div>

      <!-- 请假借口 -->
      <div class="fun-card brutal-card">
        <div class="fun-icon">🤒</div>
        <h3>请假借口生成器</h3>
        <div class="excuse-box">
          <p v-if="currentExcuse" class="excuse-text">"{{ currentExcuse }}"</p>
          <p v-else class="excuse-placeholder">点击生成一个请假借口</p>
        </div>
        <button class="brutal-btn" @click="generateExcuse">🎯 生成借口</button>
      </div>

      <!-- 今天吃什么 -->
      <div class="fun-card brutal-card">
        <div class="fun-icon">🍜</div>
        <h3>今天吃什么</h3>
        <div class="food-result" v-if="currentFood">
          <span class="food-emoji">{{ currentFood.emoji }}</span>
          <span class="food-name" :class="{ spinning: foodSpinning }">{{ currentFood.name }}</span>
          <span class="food-risk">{{ currentFood.risk }}</span>
        </div>
        <p v-else class="food-placeholder">选择困难症？让命运决定</p>
        <button class="brutal-btn" @click="spinFood" :disabled="foodSpinning">
          {{ foodSpinning ? '转转转...' : '🎰 转一下' }}
        </button>
      </div>

      <!-- 职场舒适度 -->
      <div class="fun-card brutal-card comfort-card">
        <div class="fun-icon">📊</div>
        <h3>职场舒适度测评</h3>

        <div v-if="comfortStep === -1" class="comfort-start">
          <p>回答8个问题，测测你今天的职场幸福指数</p>
          <button class="brutal-btn" @click="startComfort">📋 开始测评</button>
        </div>

        <div v-else-if="!comfortDone" class="comfort-quiz">
          <div class="comfort-progress">
            {{ comfortStep + 1 }} / {{ comfortQs.length }}
          </div>
          <p class="comfort-question">{{ comfortQs[comfortStep].q }}</p>
          <div class="comfort-btns">
            <button class="brutal-btn" @click="answerComfort(true)">是 ✓</button>
            <button class="brutal-btn outline" @click="answerComfort(false)">否 ✗</button>
          </div>
        </div>

        <div v-else class="comfort-result">
          <div class="comfort-score" :style="{ color: comfortLevel().color }">
            {{ comfortLevel().emoji }} {{ comfortScore }}分
          </div>
          <div class="comfort-level" :style="{ background: comfortLevel().color }">
            {{ comfortLevel().text }}
          </div>
          <button class="brutal-btn outline" @click="comfortStep = -1">再测一次</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fun {
  padding: 48px 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.section-header { margin-bottom: 32px; }
.fun-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
.fun-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  text-align: center;
}
.fun-icon { font-size: 36px; line-height: 1; }
.fun-card h3 {
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
}

/* 彩票球 */
.lottery-balls {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}
.lottery-ball {
  width: 36px;
  height: 36px;
  background: var(--fg);
  color: var(--bg);
  border: 2px solid var(--fg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}
.lottery-ball.rolling {
  animation: ballShake 0.1s infinite alternate;
}
@keyframes ballShake {
  from { transform: translateY(-2px); }
  to { transform: translateY(2px); }
}
.fun-result {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
}

/* 借口 */
.excuse-box {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: var(--bg);
  border: 2px dashed #ddd;
  width: 100%;
}
.excuse-text {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--fg);
}
.excuse-placeholder {
  font-size: 14px;
  color: #aaa;
}

/* 吃什么 */
.food-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.food-emoji { font-size: 48px; }
.food-name {
  font-size: 24px;
  font-weight: 900;
}
.food-name.spinning {
  animation: foodSpin 0.1s infinite;
}
@keyframes foodSpin {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}
.food-risk {
  font-size: 12px;
  color: var(--muted);
  font-style: italic;
}
.food-placeholder {
  font-size: 14px;
  color: #aaa;
  min-height: 80px;
  display: flex;
  align-items: center;
}

/* 舒适度 */
.comfort-card { grid-column: span 1; }
.comfort-start p {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 12px;
}
.comfort-progress {
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
}
.comfort-question {
  font-size: 18px;
  font-weight: 700;
  padding: 16px 0;
}
.comfort-btns {
  display: flex;
  gap: 12px;
  width: 100%;
}
.comfort-btns .brutal-btn { flex: 1; }
.comfort-score {
  font-size: 48px;
  font-weight: 900;
}
.comfort-level {
  padding: 6px 20px;
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
}
.comfort-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

@media (max-width: 768px) {
  .fun-grid { grid-template-columns: 1fr; }
}
</style>
