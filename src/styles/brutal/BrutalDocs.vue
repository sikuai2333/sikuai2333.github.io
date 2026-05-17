<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const docs = ref([
  { id: 'getting-started', title: '快速开始', category: '入门', content: '# 快速开始\n\n## 安装\n\n```bash\nnpm install brutal-ui\n```\n\n## 基础使用\n\n```vue\n<template>\n  <BrutalButton>点击我</BrutalButton>\n</template>\n```' },
  { id: 'components', title: '组件库', category: '入门', content: '# 组件库\n\n## Button 按钮\n\n| 属性 | 类型 | 默认值 |\n|------|------|--------|\n| variant | string | primary |\n| size | string | medium |\n\n## Card 卡片\n\n基础卡片组件，支持阴影和边框自定义。' },
  { id: 'theming', title: '主题定制', category: '进阶', content: '# 主题定制\n\n## CSS 变量\n\n```css\n:root {\n  --brutal-bg: #f5f0e8;\n  --brutal-fg: #1a1a1a;\n  --brutal-accent: #ff6b35;\n}\n```\n\n## 暗色模式\n\n使用 `.dark` 类切换暗色主题。' },
  { id: 'api', title: 'API 参考', category: '进阶', content: '# API 参考\n\n## useBrutal()\n\n组合式函数，提供主题切换和配置。\n\n```ts\nconst { theme, toggleTheme } = useBrutal()\n```' },
])

const activeCategory = ref('全部')
const activeDoc = ref(docs.value[0])
const searchQuery = ref('')

const categories = ['全部', '入门', '进阶']

const filteredDocs = computed(() => {
  return docs.value.filter(d => {
    const matchCategory = activeCategory.value === '全部' || d.category === activeCategory.value
    const matchSearch = !searchQuery.value || d.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchSearch
  })
})
</script>

<template>
<div class="docs-page">
  <header class="docs-header">
    <button class="back-btn" @click="router.push('/2')">← 返回</button>
    <h1>BRUTAL DOCS</h1>
    <p class="tagline">技术文档 · API 参考 · 使用指南</p>
  </header>

  <div class="docs-layout">
    <aside class="docs-sidebar">
      <div class="search-box">
        <input v-model="searchQuery" placeholder="搜索文档..." class="search-input" />
      </div>
      <div class="category-filter">
        <button v-for="cat in categories" :key="cat" class="cat-btn" :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
          {{ cat }}
        </button>
      </div>
      <nav class="doc-nav">
        <button v-for="doc in filteredDocs" :key="doc.id" class="nav-item" :class="{ active: activeDoc.id === doc.id }" @click="activeDoc = doc">
          {{ doc.title }}
        </button>
      </nav>
    </aside>

    <main class="doc-content">
      <article class="doc-article">
        <div class="doc-meta">
          <span class="doc-category">{{ activeDoc.category }}</span>
        </div>
        <div class="doc-body" v-html="activeDoc.content.replace(/\n/g, '<br>')"></div>
      </article>
    </main>
  </div>

  <footer class="docs-footer">
    <p>© 2026 BRUTAL DOCS · 示例文档站</p>
  </footer>
</div>
</template>

<style scoped>
.docs-page{background:#f5f0e8;color:#1a1a1a;min-height:100vh}
.docs-header{padding:40px 20px;text-align:center;border-bottom:3px solid #1a1a1a;background:#fff}
.back-btn{position:absolute;top:20px;left:20px;padding:8px 16px;border:3px solid #1a1a1a;background:#fff;font-weight:800;font-size:12px;text-transform:uppercase;cursor:pointer;transition:all 0.15s}
.back-btn:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #1a1a1a}
.docs-header h1{font-size:clamp(28px,4vw,40px);font-weight:900;letter-spacing:0.05em;margin-bottom:8px}
.tagline{font-size:14px;color:#666}

.docs-layout{display:flex;max-width:1200px;margin:0 auto;padding:20px;gap:20px}
.docs-sidebar{width:250px;flex-shrink:0}
.search-input{width:100%;padding:12px;border:3px solid #1a1a1a;background:#fff;font-size:14px;outline:none;margin-bottom:16px}
.search-input:focus{box-shadow:4px 4px 0 #1a1a1a}
.category-filter{display:flex;gap:8px;margin-bottom:16px}
.cat-btn{flex:1;padding:8px;border:2px solid #1a1a1a;background:#fff;font-size:12px;font-weight:700;cursor:pointer;transition:all 0.15s}
.cat-btn:hover,.cat-btn.active{background:#1a1a1a;color:#fff}
.doc-nav{display:flex;flex-direction:column;gap:4px}
.nav-item{padding:12px;border:2px solid #1a1a1a;background:#fff;font-size:13px;font-weight:700;text-align:left;cursor:pointer;transition:all 0.15s}
.nav-item:hover,.nav-item.active{background:#1a1a1a;color:#fff}

.doc-content{flex:1}
.doc-article{padding:32px;border:3px solid #1a1a1a;background:#fff;box-shadow:6px 6px 0 #1a1a1a}
.doc-meta{margin-bottom:20px}
.doc-category{padding:4px 10px;border:2px solid #ff6b35;font-size:11px;font-weight:800;color:#ff6b35;text-transform:uppercase}
.doc-body{font-size:15px;line-height:1.8}
.doc-body h1{font-size:28px;font-weight:900;text-transform:uppercase;margin-bottom:16px;letter-spacing:0.02em}
.doc-body h2{font-size:20px;font-weight:800;text-transform:uppercase;margin:24px 0 12px}
.doc-body code{background:#f5f0e8;padding:2px 6px;font-family:'SF Mono',monospace;font-size:13px}
.doc-body pre{background:#1a1a1a;color:#f5f0e8;padding:16px;margin:16px 0;overflow-x:auto}
.doc-body pre code{background:none;color:inherit}
.doc-body table{width:100%;border-collapse:collapse;margin:16px 0}
.doc-body th,.doc-body td{padding:10px;border:2px solid #1a1a1a;text-align:left}
.doc-body th{background:#1a1a1a;color:#fff;font-weight:800}

.docs-footer{text-align:center;padding:40px 20px;border-top:3px solid #1a1a1a;font-size:13px;color:#666;letter-spacing:0.05em}

@media(max-width:768px){.docs-layout{flex-direction:column}.docs-sidebar{width:100%}}
</style>
