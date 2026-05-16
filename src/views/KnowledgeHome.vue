<script setup lang="ts">
import { ref } from 'vue'
import { useMockKnowledge } from '@/composables/useMockKnowledge'

const { getArticles, categories, searchQuery } = useMockKnowledge()
const activeCategory = ref('全部')
</script>

<template>
  <div class="knowledge-home">
    <!-- HERO -->
    <section class="kb-hero">
      <h1>NEUE BRUTAL<br/>知识库</h1>
      <p>关于新野蛮风格的一切——从理论到实战。所有文章都是 mock 内容。</p>
      <div class="search-box">
        <span class="search-icon">⌕</span>
        <input
          v-model="searchQuery"
          class="brutal-input search-input"
          placeholder="搜索文章、标签..."
        />
      </div>
    </section>

    <!-- FILTERS -->
    <section class="filters">
      <div class="filters-inner">
        <button
          v-for="c in categories"
          :key="c"
          class="filter-btn"
          :class="{ active: activeCategory === c }"
          @click="activeCategory = c"
        >
          {{ c }}
        </button>
      </div>
    </section>

    <!-- ARTICLES -->
    <section class="articles">
      <div class="articles-grid">
        <router-link
          v-for="a in getArticles(activeCategory)"
          :key="a.id"
          :to="`/knowledge/article/${a.id}`"
          class="article-card brutal-card"
        >
          <div class="article-emoji">{{ a.emoji }}</div>
          <div class="article-body">
            <div class="article-meta">
              <span class="brutal-badge">{{ a.category }}</span>
              <span class="article-date">{{ a.date }}</span>
              <span class="article-time">{{ a.readTime }}</span>
            </div>
            <h3>{{ a.title }}</h3>
            <p>{{ a.excerpt }}</p>
            <div class="article-tags">
              <span v-for="t in a.tags" :key="t" class="tag">#{{ t }}</span>
            </div>
            <div class="article-footer">
              <span class="author">{{ a.author }}</span>
              <span class="read-more">阅读全文 →</span>
            </div>
          </div>
        </router-link>

        <div v-if="getArticles(activeCategory).length === 0" class="no-results">
          <span>⌕</span>
          <h3>没有找到匹配的文章</h3>
          <p>试试其他关键词或分类</p>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="kb-footer">
      <div class="footer-inner">
        <span>◈ NEUE BRUTAL KNOWLEDGE BASE</span>
        <span>ALL CONTENT IS MOCK · 2026</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.knowledge-home { padding-bottom: 0; }

/* Hero */
.kb-hero {
  padding: 80px 24px 60px;
  max-width: 1200px;
  margin: 0 auto;
}
.kb-hero h1 {
  font-size: clamp(40px, 8vw, 72px);
  font-weight: 900;
  line-height: 0.95;
  margin-bottom: 16px;
}
.kb-hero p {
  font-size: 15px;
  color: var(--brutal-muted);
  max-width: 480px;
  line-height: 1.6;
  margin-bottom: 28px;
}
.search-box {
  position: relative;
  max-width: 480px;
}
.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: var(--brutal-muted);
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding-left: 48px;
  font-size: 16px;
}

/* Filters */
.filters {
  border-bottom: 3px solid var(--brutal-border);
  margin-bottom: 40px;
}
.filters-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  gap: 4px;
  overflow-x: auto;
}
.filter-btn {
  padding: 14px 24px;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 3px solid transparent;
  margin-bottom: -3px;
  transition: all 0.15s;
  white-space: nowrap;
}
.filter-btn:hover { border-bottom-color: var(--brutal-muted); }
.filter-btn.active {
  border-bottom-color: var(--brutal-accent);
  color: var(--brutal-accent);
}

/* Articles */
.articles {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 80px;
}
.articles-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.article-card {
  display: flex;
  gap: 24px;
  padding: 28px;
  text-decoration: none;
  color: inherit;
}
.article-emoji {
  font-size: 48px;
  flex-shrink: 0;
  width: 64px;
  text-align: center;
}
.article-body { flex: 1; min-width: 0; }
.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.article-date, .article-time {
  font-size: 12px;
  color: var(--brutal-muted);
}
.article-body h3 {
  font-size: 20px;
  font-weight: 900;
  line-height: 1.3;
  margin-bottom: 8px;
}
.article-body p {
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 12px;
}
.article-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.tag {
  font-size: 12px;
  color: var(--brutal-accent);
  font-weight: 700;
}
.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
.author { color: var(--brutal-muted); }
.read-more {
  font-weight: 800;
  color: var(--brutal-accent);
}

.no-results {
  text-align: center;
  padding: 80px 24px;
  color: var(--brutal-muted);
}
.no-results span { font-size: 48px; display: block; margin-bottom: 16px; }
.no-results h3 { font-size: 20px; margin-bottom: 8px; color: var(--brutal-fg); }

/* Footer */
.kb-footer {
  padding: 32px 24px;
  border-top: 3px solid var(--brutal-border);
  background: var(--brutal-fg);
  color: var(--brutal-bg);
}
.kb-footer .footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .article-card { flex-direction: column; gap: 16px; }
  .article-emoji { width: auto; text-align: left; }
  .kb-footer .footer-inner { flex-direction: column; gap: 8px; text-align: center; }
}
</style>
