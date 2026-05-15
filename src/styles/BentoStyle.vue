<script setup lang="ts">
import { ref } from 'vue'
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()

const todos = ref([
  { text: '完成门户页设计', done: true },
  { text: '配置 Cloudflare DNS', done: true },
  { text: '添加12种风格', done: false },
  { text: '写项目文档', done: false },
])
function toggleTodo(i: number) { todos.value[i].done = !todos.value[i].done }

const note = ref('')
const notes = ref<string[]>([])
function addNote() { if (note.value.trim()) { notes.value.unshift(note.value.trim()); note.value = '' } }

const chartData = [30, 55, 42, 68, 52, 78, 65, 90, 72, 85, 78, 92]
</script>

<template>
<div class="page">
  <div class="grid">
    <div class="cell hero-cell">
      <p class="date">{{ date }}</p>
      <h1 class="slogan">Explore<br>Create<br>Share</h1>
    </div>

    <div class="cell clock-cell">
      <span class="label">时间</span>
      <div class="clock">{{ time }}</div>
    </div>

    <div class="cell weather-cell">
      <span class="label">天气</span>
      <div v-if="desc" class="w-temp">{{ temp }}</div>
      <div v-if="desc" class="w-desc">{{ desc }}</div>
      <div v-else class="w-desc dim">获取中…</div>
      <div class="w-loc">淮北</div>
    </div>

    <div class="cell chart-cell">
      <span class="label">访问趋势</span>
      <div class="chart">
        <div v-for="(v,i) in chartData" :key="i" class="bar" :style="{height:v+'%'}"></div>
      </div>
    </div>

    <div class="cell todo-cell">
      <span class="label">待办</span>
      <div class="todos">
        <div v-for="(t,i) in todos" :key="i" class="todo" :class="{done:t.done}" @click="toggleTodo(i)">
          <span class="check">{{ t.done ? '☑' : '☐' }}</span>
          <span>{{ t.text }}</span>
        </div>
      </div>
    </div>

    <div class="cell note-cell">
      <span class="label">快速笔记</span>
      <div class="note-input">
        <input v-model="note" placeholder="记点什么..." @keydown.enter="addNote" />
        <button @click="addNote">+</button>
      </div>
      <div class="note-list">
        <div v-for="(n,i) in notes.slice(0,3)" :key="i" class="note-item">{{ n }}</div>
      </div>
    </div>

    <a v-for="(c,i) in cards" :key="c.title" :href="c.href" class="cell card-cell" :class="'c'+i">
      <span class="icon">{{ c.icon }}</span>
      <h3>{{ c.title }}</h3>
      <p>{{ c.desc }}</p>
    </a>

    <div class="cell footer-cell"><p>© 2026 · Portal</p></div>
  </div>
</div>
</template>

<style scoped>
.page{background:#0c0c14;color:#e8e8ec;min-height:100vh;padding:calc(44px+16px) 16px 80px}
.grid{max-width:800px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:minmax(100px,auto);gap:10px}
.cell{padding:20px;border-radius:18px;background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;transition:border-color 0.2s}
.cell:hover{border-color:rgba(255,255,255,0.1)}
.label{font-size:10px;color:rgba(255,255,255,0.2);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px}

.hero-cell{grid-column:1/3;grid-row:1/3;padding:32px;justify-content:flex-end}
.date{font-size:12px;color:rgba(255,255,255,0.25);letter-spacing:0.08em;margin-bottom:12px}
.slogan{font-size:clamp(24px,3.5vw,40px);font-weight:800;letter-spacing:-0.03em;line-height:1.15}

.clock-cell{justify-content:center;align-items:center;text-align:center}
.clock{font-family:"SF Mono",monospace;font-size:clamp(24px,3.5vw,36px);font-weight:300}

.weather-cell{justify-content:center;align-items:center;text-align:center}
.w-temp{font-size:28px;font-weight:700}
.w-desc{font-size:13px;color:rgba(255,255,255,0.5)}
.w-loc{font-size:11px;color:rgba(255,255,255,0.2);margin-top:4px}
.dim{opacity:0.3}

.chart-cell{grid-column:1/3}
.chart{flex:1;display:flex;align-items:flex-end;gap:4px;padding-top:8px}
.bar{flex:1;background:linear-gradient(180deg,#6366f1,#8b5cf6);border-radius:3px 3px 0 0;min-height:4px;transition:height 0.5s}

.todo-cell{grid-column:3;grid-row:2/4}
.todos{flex:1;display:flex;flex-direction:column;gap:6px}
.todo{display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer;padding:4px 0;transition:opacity 0.2s}
.todo.done{opacity:0.35;text-decoration:line-through}
.check{font-size:14px}

.note-cell{grid-column:1/3}
.note-input{display:flex;gap:6px;margin-bottom:8px}
.note-input input{flex:1;padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);color:#e8e8ec;font-size:13px;font-family:inherit}
.note-input input:focus{outline:none;border-color:rgba(99,102,241,0.4)}
.note-input button{width:32px;border-radius:10px;background:rgba(99,102,241,0.2);color:#818cf8;font-size:16px;cursor:pointer;border:none}
.note-list{display:flex;flex-direction:column;gap:4px}
.note-item{font-size:12px;color:rgba(255,255,255,0.4);padding:6px 10px;border-radius:8px;background:rgba(255,255,255,0.02)}

.card-cell{cursor:pointer;text-decoration:none;color:#e8e8ec}
.card-cell:hover{transform:translateY(-2px)}
.icon{font-size:22px;margin-bottom:10px}
.card-cell h3{font-size:14px;font-weight:700;margin-bottom:3px}
.card-cell p{font-size:11px;color:rgba(255,255,255,0.35)}

.footer-cell{grid-column:1/4;justify-content:center;align-items:center;font-size:12px;color:rgba(255,255,255,0.15)}
@media(max-width:640px){.grid{grid-template-columns:1fr 1fr}.hero-cell{grid-column:1/3}.todo-cell{grid-column:1/3;grid-row:auto}.note-cell{grid-column:1/3}.footer-cell{grid-column:1/3}.chart-cell{grid-column:1/3}}
</style>
