<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStyleData } from './useStyleData'
const { time, date, temp, desc, cards } = useStyleData()

const scrollPct = ref(0)
onMounted(() => {
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight
    scrollPct.value = h > 0 ? Math.round((window.scrollY / h) * 100) : 0
  })
})

const articles = [
  { title: '设计系统的价值', excerpt: '好的设计系统不是限制创造力，而是释放创造力。它让团队在一致的框架内自由发挥...', tag: '设计', date: '2026-05-10' },
  { title: '从零构建个人品牌', excerpt: '在数字时代，个人品牌就是你的名片。如何用一个网页讲述你的故事...', tag: '思考', date: '2026-05-05' },
  { title: '前端工程化的未来', excerpt: '随着 AI 辅助编程的普及，前端工程师的角色正在发生深刻变化...', tag: '技术', date: '2026-04-28' },
]
const email = ref('')
const subscribed = ref(false)
</script>

<template>
<div class="page">
  <div class="reading-bar" :style="{width:scrollPct+'%'}"></div>

  <section class="hero">
    <p class="dateline">{{ date }} · 淮北 <span v-if="desc">{{ desc }} {{ temp }}</span></p>
    <h1 class="slogan">Explore · Create · Share</h1>
    <div class="rule"></div>
    <div class="clock">{{ time }}</div>
  </section>

  <section class="quote">
    <blockquote>"设计不是看起来怎样，而是用起来怎样。"<footer>— Steve Jobs</footer></blockquote>
  </section>

  <section class="articles">
    <article v-for="a in articles" :key="a.title" class="article">
      <span class="tag">{{ a.tag }}</span>
      <h3>{{ a.title }}</h3>
      <p>{{ a.excerpt }}</p>
      <span class="meta">{{ a.date }} · 阅读 5 分钟</span>
    </article>
  </section>

  <section class="nav-cards">
    <a v-for="c in cards" :key="c.title" :href="c.href" class="card">
      <span class="num">{{ c.icon }}</span>
      <h3>{{ c.title }}</h3>
      <p>{{ c.desc }}</p>
    </a>
  </section>

  <section class="subscribe">
    <h2>订阅更新</h2>
    <form v-if="!subscribed" @submit.prevent="subscribed=true">
      <input v-model="email" type="email" placeholder="your@email.com" required />
      <button type="submit">订阅</button>
    </form>
    <p v-else class="thanks">✓ 感谢订阅</p>
  </section>

  <footer><p>© 2026 · Portal</p></footer>
</div>
</template>

<style scoped>
.page{background:#faf8f5;color:#1a1a1a;min-height:100vh;padding-top:var(--nav-height);font-family:"Georgia","Noto Serif SC","Times New Roman",serif}
.reading-bar{position:fixed;top:var(--nav-height);left:0;height:3px;background:#1a1a1a;z-index:99;transition:width 0.1s}

.hero{text-align:center;padding:0 20px 48px;max-width:1080px;margin:0 auto}
.dateline{font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#999;margin-bottom:20px}
.slogan{font-size:clamp(32px,5vw,52px);font-weight:400;letter-spacing:-0.02em;line-height:1.15;margin-bottom:20px;font-style:italic}
.rule{width:40px;height:1px;background:#1a1a1a;margin:0 auto 20px}
.clock{font-family:"SF Mono",monospace;font-size:clamp(24px,4vw,36px);font-weight:300;color:#888}

.quote{max-width:1080px;margin:0 auto;padding:0 20px 48px}
blockquote{font-size:clamp(18px,2.5vw,24px);font-style:italic;line-height:1.5;color:#444;border-left:3px solid #1a1a1a;padding-left:20px;margin:0}
blockquote footer{font-size:14px;color:#999;margin-top:8px;font-style:normal}

.articles{max-width:1080px;margin:0 auto;padding:0 20px 48px;display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:32px}
.article{border-bottom:1px solid #e0dcd4;padding-bottom:24px}
.tag{font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#e74c3c;font-family:sans-serif}
.article h3{font-size:clamp(18px,2vw,22px);font-weight:700;margin:6px 0 8px;letter-spacing:-0.01em}
.article p{font-size:15px;line-height:1.7;color:#555}
.meta{font-size:12px;color:#999;margin-top:8px;display:block}

.nav-cards{max-width:1080px;margin:0 auto;padding:0 20px 48px;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:32px}
.card{text-decoration:none;color:#1a1a1a;transition:opacity 0.2s}
.card:hover{opacity:0.6}
.num{font-size:36px;display:block;margin-bottom:8px}
.card h3{font-size:16px;font-weight:700;margin-bottom:4px}
.card p{font-size:13px;color:#666;line-height:1.5}

.subscribe{max-width:1080px;margin:0 auto;padding:0 20px 48px;text-align:center}
.subscribe h2{font-size:20px;margin-bottom:16px}
form{display:flex;gap:8px;max-width:500px;margin:0 auto}
input{flex:1;padding:12px 16px;border:1px solid #d2d2d7;border-radius:6px;font-size:15px;font-family:inherit;background:#fff}
input:focus{outline:none;border-color:#1a1a1a}
button{padding:12px 24px;background:#1a1a1a;color:#fff;border:none;border-radius:6px;font-size:15px;font-weight:600;cursor:pointer}
.thanks{font-size:16px;color:#27ae60}

footer{text-align:center;padding:40px 20px 80px;font-size:13px;color:#ccc}
@media(max-width:768px){.hero .slogan{font-size:clamp(24px,5vw,36px)}.articles{grid-template-columns:1fr}.nav-cards{grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}}@media(max-width:480px){.nav-cards{grid-template-columns:1fr}.hero .slogan{font-size:24px}.hero .clock{font-size:24px}form{flex-direction:column}}
</style>
