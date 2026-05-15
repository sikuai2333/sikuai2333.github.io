<script setup lang="ts">
import { ref } from 'vue'
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()

const notes = ref([
  { text: '完成门户设计', color: '#fff9c4', done: false },
  { text: '给花浇水', color: '#c8e6c9', done: true },
  { text: '读《设计心理学》', color: '#bbdefb', done: false },
  { text: '整理笔记', color: '#f8bbd0', done: false },
])
const newNote = ref('')
function addNote() {
  if (newNote.value.trim()) {
    const colors = ['#fff9c4','#c8e6c9','#bbdefb','#f8bbd0','#e1bee7','#ffe0b2']
    notes.value.push({ text: newNote.value.trim(), color: colors[notes.value.length % colors.length], done: false })
    newNote.value = ''
  }
}

const checklist = ref([
  { text: 'Vue 3 + Vite', done: true },
  { text: '响应式布局', done: true },
  { text: '12种风格', done: false },
  { text: '音乐播放器', done: false },
])
</script>

<template>
<div class="page">
  <section class="hero">
    <p class="date">{{ date }} <span v-if="desc">· 淮北 {{ desc }} {{ temp }}</span></p>
    <h1 class="slogan">Explore · Create · Share</h1>
    <div class="clock">{{ time }}</div>
  </section>

  <section class="board">
    <h2>📌 便利贴</h2>
    <div class="stickies">
      <div v-for="(n,i) in notes" :key="i" class="sticky" :style="{background:n.color}" :class="{done:n.done}" @click="n.done=!n.done">
        <p>{{ n.text }}</p>
        <span class="pin">📌</span>
      </div>
      <div class="sticky add-note">
        <input v-model="newNote" placeholder="新笔记..." @keydown.enter="addNote" />
        <button @click="addNote">+</button>
      </div>
    </div>
  </section>

  <section class="checklist">
    <h2>☑ 清单</h2>
    <div v-for="(c,i) in checklist" :key="i" class="check-item" :class="{checked:c.done}" @click="c.done=!c.done">
      <span class="box">{{ c.done ? '☑' : '☐' }}</span>
      <span>{{ c.text }}</span>
    </div>
  </section>

  <section class="cards">
    <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
      <span class="icon">{{ c.icon }}</span>
      <h3>{{ c.title }}</h3>
      <p>{{ c.desc }}</p>
    </a>
  </section>

  <footer><p>© 2026 · Portal</p></footer>
</div>
</template>

<style scoped>
.page{background:#f7f3eb;color:#3a3a3a;min-height:100vh;padding-top:calc(44px+60px);background-image:repeating-linear-gradient(transparent,transparent 31px,#e8e4dc 31px,#e8e4dc 32px)}
.hero{text-align:center;padding:0 20px 48px;max-width:640px;margin:0 auto}
.date{font-size:13px;color:#999;margin-bottom:16px}
.slogan{font-size:clamp(28px,4.5vw,48px);font-weight:800;letter-spacing:-0.02em;line-height:1.15;margin-bottom:16px;font-family:"ZCOOL KuaiLe","Comic Sans MS",cursive,sans-serif}
.clock{font-family:"Fira Code",monospace;font-size:clamp(24px,4vw,36px);font-weight:300;color:#888}

.board{max-width:640px;margin:0 auto;padding:0 20px 40px}
.board h2,.checklist h2{font-size:18px;font-weight:700;margin-bottom:16px}
.stickies{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.sticky{padding:16px;border-radius:2px;box-shadow:3px 3px 6px rgba(0,0,0,0.08);position:relative;cursor:pointer;transition:transform 0.15s;min-height:80px}
.sticky:hover{transform:rotate(-1deg)}
.sticky.done{opacity:0.4;text-decoration:line-through}
.sticky p{font-size:14px;line-height:1.5;font-family:"ZCOOL KuaiLe","Comic Sans MS",cursive,sans-serif}
.pin{position:absolute;top:-6px;right:8px;font-size:14px}
.add-note{display:flex;flex-direction:column;gap:8px;background:#fff!important;cursor:default}
.add-note:hover{transform:none}
.add-note input{padding:8px;border:none;border-bottom:1px solid #ddd;font-size:14px;font-family:inherit;background:transparent}
.add-note input:focus{outline:none}
.add-note button{align-self:flex-end;width:28px;height:28px;border-radius:50%;background:#ddd;border:none;font-size:16px;cursor:pointer}

.checklist{max-width:640px;margin:0 auto;padding:0 20px 40px}
.check-item{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px dashed #d2cfc7;font-size:15px;cursor:pointer;transition:opacity 0.2s}
.check-item.checked{opacity:0.35;text-decoration:line-through}
.box{font-size:18px}

.cards{max-width:640px;margin:0 auto;padding:0 20px 40px;display:flex;flex-direction:column;gap:12px}
.card{display:flex;align-items:center;gap:16px;padding:16px 20px;background:#fff;border:2px solid #e0dcd4;border-radius:4px;box-shadow:3px 3px 0 #e0dcd4;text-decoration:none;color:#3a3a3a;transition:all 0.15s}
.card:hover{transform:translate(1px,1px);box-shadow:2px 2px 0 #e0dcd4}
.icon{font-size:22px;flex-shrink:0}
.card h3{font-size:14px;font-weight:700;margin-bottom:2px}
.card p{font-size:12px;color:#888}

footer{text-align:center;padding:40px 20px 80px;font-size:13px;color:#ccc}
@media(max-width:640px){.stickies{grid-template-columns:1fr}}
</style>
