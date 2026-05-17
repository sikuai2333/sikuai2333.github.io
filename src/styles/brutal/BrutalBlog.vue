<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const posts = ref([
  { id: 1, title: 'VUE 3 组合式 API 最佳实践', date: '2026-05-15', category: '前端', tags: ['Vue', 'TypeScript'], excerpt: '深入了解 Vue 3 Composition API 的设计理念和实际应用场景...' },
  { id: 2, title: 'NEUE BRUTAL 设计语言解析', date: '2026-05-12', category: '设计', tags: ['CSS', '设计'], excerpt: '探索新野蛮主义设计风格的核心原则和实现方法...' },
  { id: 3, title: 'TYPESCRIPT 类型体操入门', date: '2026-05-10', category: '前端', tags: ['TypeScript'], excerpt: '掌握 TypeScript 高级类型推导技巧...' },
  { id: 4, title: 'VITE 构建优化指南', date: '2026-05-08', category: '工程化', tags: ['Vite', '性能'], excerpt: '让你的 Vite 项目构建速度提升 10 倍...' },
  { id: 5, title: 'CSS GRID 布局实战', date: '2026-05-05', category: '前端', tags: ['CSS'], excerpt: '用 CSS Grid 构建复杂的响应式布局...' },
  { id: 6, title: 'NODE.JS 微服务架构', date: '2026-05-02', category: '后端', tags: ['Node.js', '架构'], excerpt: '使用 Node.js 构建可扩展的微服务系统...' },
])

const categories = ['全部', '前端', '后端', '设计', '工程化']
const activeCategory = ref('全部')
const searchQuery = ref('')

const filteredPosts = computed(() => {
  return posts.value.filter(p => {
    const matchCategory = activeCategory.value === '全部' || p.category === activeCategory.value
    const matchSearch = !searchQuery.value || p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchSearch
  })
})
</script>

<template>
<div class="blog-page">
  <header class="blog-header">
    <button class="back-btn" @click="router.push('/2')">← 返回</button>
    <h1>TECH BLOG</h1>
    <p class="tagline">技术博客 · 设计思考 · 代码实践</p>
  </header>

  <div class="blog-layout">
    <aside class="sidebar">
      <div class="search-box">
        <input v-model="searchQuery" placeholder="搜索文章..." class="search-input" />
      </div>
      <div class="category-list">
        <h3>分类</h3>
        <button v-for="cat in categories" :key="cat" class="cat-btn" :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
          {{ cat }}
        </button>
      </div>
      <div class="stats-box">
        <h3>统计</h3>
        <p>文章: {{ posts.length }}</p>
        <p>分类: {{ categories.length - 1 }}</p>
      </div>
    </aside>

    <main class="post-list">
      <article v-for="post in filteredPosts" :key="post.id" class="post-card">
        <div class="post-meta">
          <span class="post-date">{{ post.date }}</span>
          <span class="post-category">{{ post.category }}</span>
        </div>
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <button class="read-more">阅读全文 →</button>
      </article>
    </main>
  </div>

  <footer class="blog-footer">
    <p>© 2026 TECH BLOG · BRUTAL STYLE</p>
  </footer>
</div>
</template>

<style scoped>
.blog-page{background:#f5f0e8;color:#1a1a1a;min-height:100vh}
.blog-header{padding:60px 20px 40px;text-align:center;border-bottom:3px solid #1a1a1a;background:#fff}
.back-btn{position:absolute;top:20px;left:20px;padding:8px 16px;border:3px solid #1a1a1a;background:#fff;font-weight:800;font-size:12px;text-transform:uppercase;cursor:pointer;transition:all 0.15s}
.back-btn:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #1a1a1a}
.blog-header h1{font-size:clamp(32px,5vw,48px);font-weight:900;letter-spacing:0.05em;margin-bottom:8px}
.tagline{font-size:14px;color:#666}

.blog-layout{display:flex;max-width:1200px;margin:0 auto;padding:20px;gap:20px}
.sidebar{width:250px;flex-shrink:0}
.search-input{width:100%;padding:12px;border:3px solid #1a1a1a;background:#fff;font-size:14px;outline:none}
.search-input:focus{box-shadow:4px 4px 0 #1a1a1a}
.category-list{margin-top:20px}
.category-list h3{font-size:14px;font-weight:800;text-transform:uppercase;margin-bottom:12px;letter-spacing:0.05em}
.cat-btn{display:block;width:100%;padding:10px 12px;border:2px solid #1a1a1a;background:#fff;margin-bottom:8px;font-size:13px;font-weight:700;text-align:left;cursor:pointer;transition:all 0.15s}
.cat-btn:hover,.cat-btn.active{background:#1a1a1a;color:#fff}
.stats-box{margin-top:20px;padding:16px;border:3px solid #1a1a1a;background:#fff}
.stats-box h3{font-size:14px;font-weight:800;text-transform:uppercase;margin-bottom:12px}
.stats-box p{font-size:13px;margin-bottom:4px}

.post-list{flex:1;display:flex;flex-direction:column;gap:16px}
.post-card{padding:24px;border:3px solid #1a1a1a;background:#fff;box-shadow:6px 6px 0 #1a1a1a;transition:all 0.15s}
.post-card:hover{transform:translate(3px,3px);box-shadow:3px 3px 0 #1a1a1a}
.post-meta{display:flex;gap:12px;margin-bottom:12px}
.post-date{font-size:12px;color:#666}
.post-category{font-size:12px;font-weight:800;color:#ff6b35;text-transform:uppercase}
.post-title{font-size:20px;font-weight:900;text-transform:uppercase;letter-spacing:0.02em;margin-bottom:12px}
.post-excerpt{font-size:14px;color:#444;line-height:1.6;margin-bottom:16px}
.post-tags{display:flex;gap:8px;margin-bottom:16px}
.tag{padding:4px 10px;border:2px solid #1a1a1a;font-size:11px;font-weight:800;text-transform:uppercase}
.read-more{padding:10px 20px;border:3px solid #1a1a1a;background:#ff6b35;color:#fff;font-weight:800;font-size:12px;text-transform:uppercase;cursor:pointer;transition:all 0.15s}
.read-more:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #1a1a1a}

.blog-footer{text-align:center;padding:40px 20px;border-top:3px solid #1a1a1a;font-size:13px;color:#666;letter-spacing:0.05em}

@media(max-width:768px){.blog-layout{flex-direction:column}.sidebar{width:100%}}
</style>
