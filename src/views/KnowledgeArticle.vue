<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMockKnowledge } from '@/composables/useMockKnowledge'

const route = useRoute()
const { getArticle, getRelated } = useMockKnowledge()

const article = computed(() => getArticle(route.params.id as string))
const related = computed(() => getRelated(route.params.id as string))

// 简单的 markdown 转 HTML
function renderContent(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, (m) => {
      const code = m.slice(3, -3).replace(/^[a-z]*\n/, '')
      return `<pre class="code-block"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
    })
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code class="inline-code">$1</code>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ordered">$2</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '<br/><br/>')
}

// 模拟评论
const comments = ref([
  { author: '匿名用户A', date: '2026-05-11', content: '写得很好，终于理解新野蛮风格了。' },
  { author: '匿名用户B', date: '2026-05-10', content: '希望能出一期关于动画设计的文章。' },
])
const newComment = ref('')
const commentSubmitted = ref(false)

const submitComment = () => {
  if (!newComment.value.trim()) return
  comments.value.push({
    author: '访客',
    date: new Date().toISOString().slice(0, 10),
    content: newComment.value.trim(),
  })
  newComment.value = ''
  commentSubmitted.value = true
  setTimeout(() => { commentSubmitted.value = false }, 2000)
}

// 模拟点赞
const likes = ref(42)
const liked = ref(false)
const toggleLike = () => {
  liked.value = !liked.value
  likes.value += liked.value ? 1 : -1
}
</script>

<template>
  <div class="article-page">
    <div v-if="article" class="article-content">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link to="/knowledge">知识库</router-link>
        <span class="sep">/</span>
        <span>{{ article.category }}</span>
        <span class="sep">/</span>
        <span class="current">{{ article.title }}</span>
      </div>

      <!-- Header -->
      <header class="article-header">
        <span class="brutal-badge">{{ article.category }}</span>
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <span>{{ article.author }}</span>
          <span>·</span>
          <span>{{ article.date }}</span>
          <span>·</span>
          <span>{{ article.readTime }}</span>
        </div>
        <div class="article-tags">
          <span v-for="t in article.tags" :key="t" class="tag">#{{ t }}</span>
        </div>
      </header>

      <!-- Body -->
      <article class="article-body" v-html="renderContent(article.content)"></article>

      <!-- Actions -->
      <div class="article-actions">
        <button class="action-btn" :class="{ active: liked }" @click="toggleLike">
          {{ liked ? '♥' : '♡' }} {{ likes }}
        </button>
        <button class="action-btn" @click="$el.querySelector('.comment-form textarea')?.focus()">
          💬 {{ comments.length }}
        </button>
      </div>

      <!-- Related -->
      <section v-if="related.length > 0" class="related">
        <h2>相关文章</h2>
        <div class="related-grid">
          <router-link
            v-for="r in related"
            :key="r.id"
            :to="`/knowledge/article/${r.id}`"
            class="related-card brutal-card"
          >
            <span class="related-emoji">{{ r.emoji }}</span>
            <h3>{{ r.title }}</h3>
            <p>{{ r.excerpt }}</p>
          </router-link>
        </div>
      </section>

      <!-- Comments -->
      <section class="comments">
        <h2>评论 ({{ comments.length }})</h2>
        <div class="comment-list">
          <div v-for="c in comments" :key="c.date + c.author" class="comment-item">
            <div class="comment-header">
              <span class="comment-author">{{ c.author }}</span>
              <span class="comment-date">{{ c.date }}</span>
            </div>
            <p>{{ c.content }}</p>
          </div>
        </div>

        <div class="comment-form">
          <transition name="toast">
            <div v-if="commentSubmitted" class="comment-toast">✓ 评论提交成功</div>
          </transition>
          <textarea
            v-model="newComment"
            class="brutal-input"
            placeholder="写下你的评论..."
            rows="3"
          ></textarea>
          <button class="brutal-btn sm" @click="submitComment">提交评论</button>
        </div>
      </section>
    </div>

    <!-- Not found -->
    <div v-else class="not-found">
      <h2>文章不存在</h2>
      <router-link to="/knowledge" class="brutal-btn outline">返回知识库</router-link>
    </div>
  </div>
</template>



<style scoped>
.article-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--brutal-muted);
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.breadcrumb a { color: var(--brutal-accent); font-weight: 700; }
.sep { color: #ccc; }
.current { color: var(--brutal-fg); font-weight: 700; }

.article-header {
  margin-bottom: 40px;
  padding-bottom: 28px;
  border-bottom: 3px solid var(--brutal-border);
}
.article-header h1 {
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 900;
  line-height: 1.2;
  margin: 16px 0;
}
.article-meta {
  display: flex;
  gap: 8px;
  font-size: 14px;
  color: var(--brutal-muted);
  margin-bottom: 12px;
}
.article-tags {
  display: flex;
  gap: 8px;
}
.tag {
  font-size: 13px;
  color: var(--brutal-accent);
  font-weight: 700;
}

/* Article Body */
.article-body {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 40px;
}
.article-body :deep(h2) {
  font-size: 24px;
  font-weight: 900;
  margin: 40px 0 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #ddd;
}
.article-body :deep(h3) {
  font-size: 18px;
  font-weight: 800;
  margin: 28px 0 12px;
}
.article-body :deep(strong) { font-weight: 800; color: var(--brutal-fg); }
.article-body :deep(.inline-code) {
  padding: 2px 6px;
  background: #f0ebe3;
  border: 1px solid #ddd;
  font-family: 'SF Mono', monospace;
  font-size: 14px;
}
.article-body :deep(.code-block) {
  background: #1a1a1a;
  color: #f5f0e8;
  padding: 20px;
  margin: 20px 0;
  overflow-x: auto;
  border: 3px solid #333;
}
.article-body :deep(.code-block code) {
  font-family: 'SF Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
}
.article-body :deep(ul),
.article-body :deep(ol) {
  padding-left: 24px;
  margin: 12px 0;
}
.article-body :deep(li) {
  margin: 6px 0;
  line-height: 1.6;
}

/* Actions */
.article-actions {
  display: flex;
  gap: 12px;
  padding: 20px 0;
  border-top: 3px solid var(--brutal-border);
  border-bottom: 3px solid var(--brutal-border);
  margin-bottom: 48px;
}
.action-btn {
  padding: 10px 20px;
  border: 3px solid var(--brutal-border);
  font-size: 16px;
  font-weight: 800;
  box-shadow: var(--brutal-shadow-sm);
  transition: all 0.15s;
}
.action-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--brutal-border);
}
.action-btn.active {
  background: var(--brutal-accent);
  color: #fff;
}

/* Related */
.related { margin-bottom: 48px; }
.related h2 {
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}
.related-card {
  padding: 20px;
  text-decoration: none;
  color: inherit;
}
.related-emoji { font-size: 28px; margin-bottom: 10px; display: block; }
.related-card h3 { font-size: 14px; font-weight: 800; margin-bottom: 6px; }
.related-card p { font-size: 12px; color: var(--brutal-muted); line-height: 1.5; }

/* Comments */
.comments h2 {
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.comment-list { margin-bottom: 24px; }
.comment-item {
  padding: 16px 0;
  border-bottom: 2px solid #eee;
}
.comment-header {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}
.comment-author { font-size: 14px; font-weight: 800; }
.comment-date { font-size: 12px; color: var(--brutal-muted); }
.comment-item p { font-size: 14px; color: #444; line-height: 1.5; }

.comment-form {
  position: relative;
}
.comment-form textarea {
  width: 100%;
  margin-bottom: 12px;
  resize: vertical;
}
.comment-toast {
  position: absolute;
  top: -48px;
  left: 0;
  padding: 10px 20px;
  background: var(--brutal-success);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  border: 2px solid var(--brutal-border);
}
.toast-enter-active, .toast-leave-active { transition: all 0.2s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-8px); }

.not-found {
  text-align: center;
  padding: 120px 24px;
}
.not-found h2 { font-size: 24px; margin-bottom: 24px; }

@media (max-width: 768px) {
  .related-grid { grid-template-columns: 1fr; }
}
</style>
