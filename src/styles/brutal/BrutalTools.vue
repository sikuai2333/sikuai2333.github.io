<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const tools = ref([
  { id: 'calc', name: '计算器', icon: '🧮', desc: '基础计算器，支持加减乘除' },
  { id: 'converter', name: '单位转换', icon: '📐', desc: '长度、重量、温度单位转换' },
  { id: 'color', name: '颜色选择', icon: '🎨', desc: 'HEX/RGB/HSL 颜色转换' },
  { id: 'json', name: 'JSON 格式化', icon: '📋', desc: 'JSON 美化、压缩、验证' },
  { id: 'base64', name: 'Base64 编码', icon: '🔐', desc: '文本 Base64 编解码' },
  { id: 'hash', name: '哈希生成', icon: '🔑', desc: 'MD5/SHA256 哈希计算' },
])

const activeTool = ref('')

// 计算器
const calcDisplay = ref('0')
const calcExpression = ref('')
function calcInput(val: string) {
  if (calcDisplay.value === '0' && val !== '.') {
    calcDisplay.value = val
  } else {
    calcDisplay.value += val
  }
}
function calcClear() {
  calcDisplay.value = '0'
  calcExpression.value = ''
}
function calcResult() {
  try {
    calcExpression.value = calcDisplay.value + ' ='
    calcDisplay.value = eval(calcDisplay.value).toString()
  } catch {
    calcDisplay.value = 'Error'
  }
}

// 颜色转换
const hexColor = ref('#ff6b35')
const rgbColor = computed(() => {
  const hex = hexColor.value.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgb(${r}, ${g}, ${b})`
})

// Base64
const base64Input = ref('')
const base64Output = ref('')
function encodeBase64() {
  base64Output.value = btoa(base64Input.value)
}
function decodeBase64() {
  try {
    base64Output.value = atob(base64Input.value)
  } catch {
    base64Output.value = '无效的 Base64 字符串'
  }
}
</script>

<template>
<div class="tools-page">
  <header class="tools-header">
    <button class="back-btn" @click="router.push('/2')">← 返回</button>
    <h1>BRUTAL TOOLS</h1>
    <p class="tagline">在线工具箱 · 实用小工具合集</p>
  </header>

  <div class="tools-layout">
    <aside class="tools-sidebar">
      <nav class="tool-nav">
        <button v-for="tool in tools" :key="tool.id" class="tool-item" :class="{ active: activeTool === tool.id }" @click="activeTool = tool.id">
          <span class="tool-icon">{{ tool.icon }}</span>
          <span>{{ tool.name }}</span>
        </button>
      </nav>
    </aside>

    <main class="tool-content">
      <div v-if="!activeTool" class="tool-placeholder">
        <h2>选择一个工具开始使用</h2>
        <p>从左侧菜单选择工具</p>
      </div>

      <div v-else-if="activeTool === 'calc'" class="tool-panel">
        <h2>计算器</h2>
        <div class="calc">
          <div class="calc-screen">
            <div class="calc-expression">{{ calcExpression }}</div>
            <div class="calc-display">{{ calcDisplay }}</div>
          </div>
          <div class="calc-buttons">
            <button @click="calcClear" class="calc-btn clear">C</button>
            <button @click="calcInput('/')" class="calc-btn op">÷</button>
            <button @click="calcInput('*')" class="calc-btn op">×</button>
            <button @click="calcInput('-')" class="calc-btn op">-</button>
            <button @click="calcInput('7')" class="calc-btn">7</button>
            <button @click="calcInput('8')" class="calc-btn">8</button>
            <button @click="calcInput('9')" class="calc-btn">9</button>
            <button @click="calcInput('+')" class="calc-btn op">+</button>
            <button @click="calcInput('4')" class="calc-btn">4</button>
            <button @click="calcInput('5')" class="calc-btn">5</button>
            <button @click="calcInput('6')" class="calc-btn">6</button>
            <button @click="calcResult" class="calc-btn equals">=</button>
            <button @click="calcInput('1')" class="calc-btn">1</button>
            <button @click="calcInput('2')" class="calc-btn">2</button>
            <button @click="calcInput('3')" class="calc-btn">3</button>
            <button @click="calcInput('0')" class="calc-btn zero">0</button>
            <button @click="calcInput('.')" class="calc-btn">.</button>
          </div>
        </div>
      </div>

      <div v-else-if="activeTool === 'color'" class="tool-panel">
        <h2>颜色选择器</h2>
        <div class="color-tool">
          <div class="color-preview" :style="{ background: hexColor }"></div>
          <div class="color-inputs">
            <label>HEX: <input v-model="hexColor" class="color-input" /></label>
            <label>RGB: <input :value="rgbColor" readonly class="color-input" /></label>
          </div>
        </div>
      </div>

      <div v-else-if="activeTool === 'base64'" class="tool-panel">
        <h2>Base64 编解码</h2>
        <div class="base64-tool">
          <textarea v-model="base64Input" placeholder="输入文本..." class="base64-input"></textarea>
          <div class="base64-buttons">
            <button @click="encodeBase64" class="action-btn">编码 →</button>
            <button @click="decodeBase64" class="action-btn">← 解码</button>
          </div>
          <textarea v-model="base64Output" placeholder="结果..." class="base64-output" readonly></textarea>
        </div>
      </div>

      <div v-else class="tool-panel">
        <h2>{{ tools.find(t => t.id === activeTool)?.name }}</h2>
        <p>此工具正在开发中...</p>
      </div>
    </main>
  </div>

  <footer class="tools-footer">
    <p>© 2026 BRUTAL TOOLS · 示例工具站</p>
  </footer>
</div>
</template>

<style scoped>
.tools-page{background:#f5f0e8;color:#1a1a1a;min-height:100vh}
.tools-header{padding:40px 20px;text-align:center;border-bottom:3px solid #1a1a1a;background:#fff}
.back-btn{position:absolute;top:20px;left:20px;padding:8px 16px;border:3px solid #1a1a1a;background:#fff;font-weight:800;font-size:12px;text-transform:uppercase;cursor:pointer;transition:all 0.15s}
.back-btn:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #1a1a1a}
.tools-header h1{font-size:clamp(28px,4vw,40px);font-weight:900;letter-spacing:0.05em;margin-bottom:8px}
.tagline{font-size:14px;color:#666}

.tools-layout{display:flex;max-width:1200px;margin:0 auto;padding:20px;gap:20px}
.tools-sidebar{width:200px;flex-shrink:0}
.tool-nav{display:flex;flex-direction:column;gap:8px}
.tool-item{display:flex;align-items:center;gap:10px;padding:14px;border:3px solid #1a1a1a;background:#fff;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.15s}
.tool-item:hover,.tool-item.active{background:#1a1a1a;color:#fff}
.tool-icon{font-size:18px}

.tool-content{flex:1}
.tool-placeholder{text-align:center;padding:80px 20px;border:3px solid #1a1a1a;background:#fff}
.tool-placeholder h2{font-size:20px;font-weight:800;margin-bottom:8px}
.tool-placeholder p{color:#666}

.tool-panel{padding:24px;border:3px solid #1a1a1a;background:#fff;box-shadow:6px 6px 0 #1a1a1a}
.tool-panel h2{font-size:20px;font-weight:900;text-transform:uppercase;margin-bottom:20px}

.calc{max-width:300px}
.calc-screen{background:#1a1a1a;color:#f5f0e8;padding:16px;margin-bottom:12px;text-align:right}
.calc-expression{font-size:12px;color:#666;margin-bottom:4px}
.calc-display{font-size:32px;font-weight:700;font-family:'SF Mono',monospace}
.calc-buttons{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.calc-btn{padding:16px;border:3px solid #1a1a1a;background:#fff;font-size:18px;font-weight:800;cursor:pointer;transition:all 0.15s}
.calc-btn:hover{background:#f5f0e8}
.calc-btn:active{transform:translate(2px,2px)}
.calc-btn.op{background:#1a1a1a;color:#fff}
.calc-btn.equals{background:#ff6b35;color:#fff}
.calc-btn.clear{background:#d63031;color:#fff}
.calc-btn.zero{grid-column:span 2}

.color-tool{display:flex;flex-direction:column;gap:20px}
.color-preview{width:100%;height:150px;border:3px solid #1a1a1a}
.color-inputs{display:flex;flex-direction:column;gap:12px}
.color-inputs label{display:flex;align-items:center;gap:12px;font-weight:700}
.color-input{flex:1;padding:10px;border:3px solid #1a1a1a;font-family:'SF Mono',monospace}

.base64-tool{display:flex;flex-direction:column;gap:16px}
.base64-input,.base64-output{width:100%;height:120px;padding:12px;border:3px solid #1a1a1a;font-family:'SF Mono',monospace;font-size:13px;resize:vertical}
.base64-buttons{display:flex;gap:12px}
.action-btn{flex:1;padding:12px;border:3px solid #1a1a1a;background:#ff6b35;color:#fff;font-weight:800;font-size:14px;cursor:pointer;transition:all 0.15s}
.action-btn:hover{transform:translate(2px,2px)}

.tools-footer{text-align:center;padding:40px 20px;border-top:3px solid #1a1a1a;font-size:13px;color:#666;letter-spacing:0.05em}

@media(max-width:768px){.tools-layout{flex-direction:column}.tools-sidebar{width:100%}}
</style>
