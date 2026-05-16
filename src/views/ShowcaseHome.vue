<script setup lang="ts">
import { ref } from 'vue'

const features = [
  { icon: '🧱', title: '硬边框', desc: '3px 实线边框，零圆角。每个元素都像一块混凝土砖。' },
  { icon: '⬛', title: '硬阴影', desc: '非模糊的位移阴影，创造真实的物理深度感。' },
  { icon: '🎨', title: '三色系统', desc: '黑 + 暖白 + 橙色强调。最少的颜色，最大的冲击。' },
  { icon: '🔤', title: '全大写标签', desc: '标题和按钮全大写，字间距拉宽，力量感拉满。' },
  { icon: '⚡', title: '干脆动画', desc: '150ms 以内，无缓动曲线。按下就是按下。' },
  { icon: '📐', title: '结构清晰', desc: '信息层级用字重和大小区分，不靠装饰。' },
]

const demos = [
  {
    icon: '🛒',
    title: '电商网站',
    desc: '商品列表、详情、购物车、结算全流程',
    path: '/shop',
    tags: ['6 件商品', '可交互', '购物车'],
  },
  {
    icon: '📚',
    title: '知识库',
    desc: '文章列表、详情、搜索、分类筛选',
    path: '/knowledge',
    tags: ['6 篇文章', '搜索', '分类'],
  },
]

const principles = [
  '不用渐变',
  '不用毛玻璃',
  '不用圆角',
  '不用模糊阴影',
  '不用超过 4 种颜色',
  '不用斜体',
  '不加修饰',
]

const activePrinciple = ref(-1)
</script>

<template>
  <div class="showcase">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-badge">DESIGN SYSTEM</div>
        <h1 class="hero-title">NEUE<br/>BRUTAL</h1>
        <p class="hero-sub">新野蛮主义设计风格</p>
        <p class="hero-desc">粗粝、直接、不加修饰。像混凝土一样诚实的界面设计语言。</p>
        <div class="hero-actions">
          <router-link to="/shop" class="brutal-btn">查看电商 Demo →</router-link>
          <router-link to="/knowledge" class="brutal-btn outline">查看知识库 Demo →</router-link>
        </div>
      </div>
      <div class="hero-deco">
        <div class="deco-block b1"></div>
        <div class="deco-block b2"></div>
        <div class="deco-block b3"></div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="features">
      <div class="section-inner">
        <h2 class="section-title">核心特征</h2>
        <div class="features-grid">
          <div v-for="f in features" :key="f.title" class="feature-card brutal-card">
            <span class="feature-icon">{{ f.icon }}</span>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRINCIPLES -->
    <section class="principles">
      <div class="section-inner">
        <h2 class="section-title">设计禁区</h2>
        <p class="section-desc">新野蛮风格有明确的「不做什么」——这些约束不是限制，而是风格的骨架。</p>
        <div class="principles-list">
          <div
            v-for="(p, i) in principles"
            :key="p"
            class="principle-item"
            :class="{ active: activePrinciple === i }"
            @mouseenter="activePrinciple = i"
            @mouseleave="activePrinciple = -1"
          >
            <span class="principle-x">✕</span>
            <span class="principle-text">{{ p }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- DEMOS -->
    <section class="demos">
      <div class="section-inner">
        <h2 class="section-title">在线演示</h2>
        <p class="section-desc">用真实交互体验新野蛮风格。每个 Demo 都是完整的、可操作的 mock 网站。</p>
        <div class="demos-grid">
          <router-link
            v-for="d in demos"
            :key="d.path"
            :to="d.path"
            class="demo-card brutal-card"
          >
            <span class="demo-icon">{{ d.icon }}</span>
            <div class="demo-info">
              <h3>{{ d.title }}</h3>
              <p>{{ d.desc }}</p>
              <div class="demo-tags">
                <span v-for="t in d.tags" :key="t" class="brutal-badge">{{ t }}</span>
              </div>
            </div>
            <span class="demo-arrow">→</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CODE SAMPLE -->
    <section class="code-section">
      <div class="section-inner">
        <h2 class="section-title">CSS 核心</h2>
        <div class="code-block brutal-card">
          <pre><code>.element {
  border: 3px solid #1a1a1a;
  box-shadow: 6px 6px 0 #1a1a1a;
  border-radius: 0;
  background: #fff;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.05em;
  transition: all 0.15s;
}

.element:hover {
  transform: translate(3px, 3px);
  box-shadow: 3px 3px 0 #1a1a1a;
}</code></pre>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-left">
          <span class="footer-logo">◈ NEUE BRUTAL</span>
          <p>新野蛮主义设计风格展示</p>
        </div>
        <div class="footer-right">
          <p>ALL RIGHTS RESERVED © 2026</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.showcase { padding-bottom: 0; }

/* === HERO === */
.hero {
  position: relative;
  overflow: hidden;
  padding: 120px 24px 80px;
  max-width: 1200px;
  margin: 0 auto;
}
.hero-inner { position: relative; z-index: 2; }
.hero-badge {
  display: inline-block;
  padding: 6px 14px;
  border: 2px solid var(--brutal-border);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  margin-bottom: 24px;
}
.hero-title {
  font-size: clamp(64px, 12vw, 140px);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}
.hero-sub {
  font-size: clamp(18px, 3vw, 28px);
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brutal-accent);
  margin-bottom: 16px;
}
.hero-desc {
  font-size: 16px;
  color: var(--brutal-muted);
  max-width: 480px;
  line-height: 1.6;
  margin-bottom: 32px;
}
.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* decorative blocks */
.hero-deco {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  z-index: 1;
  pointer-events: none;
}
.deco-block {
  position: absolute;
  border: 3px solid var(--brutal-border);
  opacity: 0.08;
}
.b1 { width: 200px; height: 200px; top: 10%; right: 5%; background: var(--brutal-accent); }
.b2 { width: 140px; height: 140px; top: 45%; right: 25%; background: var(--brutal-fg); }
.b3 { width: 100px; height: 100px; bottom: 10%; right: 10%; background: var(--brutal-accent); }

/* === SECTION COMMON === */
.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.section-title {
  font-size: clamp(24px, 4vw, 40px);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}
.section-desc {
  font-size: 15px;
  color: var(--brutal-muted);
  max-width: 560px;
  line-height: 1.6;
  margin-bottom: 40px;
}

/* === FEATURES === */
.features {
  padding: 80px 0;
  background: var(--brutal-fg);
  color: var(--brutal-bg);
}
.features .section-title { color: var(--brutal-bg); }
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
.feature-card {
  padding: 28px;
  background: #222;
  border-color: #444;
  color: var(--brutal-bg);
}
.feature-card:hover {
  box-shadow: 3px 3px 0 #444;
}
.feature-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 16px;
}
.feature-card h3 {
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}
.feature-card p {
  font-size: 13px;
  color: #aaa;
  line-height: 1.5;
}

/* === PRINCIPLES === */
.principles {
  padding: 80px 0;
}
.principles-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.principle-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 2px solid #ddd;
  cursor: default;
  transition: all 0.15s;
}
.principle-item:hover {
  padding-left: 12px;
  background: rgba(214, 48, 49, 0.04);
}
.principle-x {
  font-size: 20px;
  font-weight: 900;
  color: var(--brutal-danger);
  width: 32px;
  text-align: center;
  flex-shrink: 0;
}
.principle-text {
  font-size: 18px;
  font-weight: 700;
}

/* === DEMOS === */
.demos {
  padding: 80px 0;
  background: #eee;
}
.demos-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.demo-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
  text-decoration: none;
}
.demo-icon {
  font-size: 48px;
  flex-shrink: 0;
}
.demo-info {
  flex: 1;
}
.demo-info h3 {
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.demo-info p {
  font-size: 14px;
  color: var(--brutal-muted);
  margin-bottom: 12px;
}
.demo-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.demo-arrow {
  font-size: 28px;
  font-weight: 900;
  color: var(--brutal-accent);
  flex-shrink: 0;
}

/* === CODE === */
.code-section {
  padding: 80px 0;
}
.code-block {
  padding: 28px;
  overflow-x: auto;
}
.code-block pre {
  margin: 0;
}
.code-block code {
  font-family: 'SF Mono', 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.7;
  color: var(--brutal-fg);
}

/* === FOOTER === */
.footer {
  padding: 48px 24px;
  border-top: var(--brutal-border-w) solid var(--brutal-border);
  background: var(--brutal-fg);
  color: var(--brutal-bg);
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}
.footer-logo {
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.1em;
}
.footer-left p {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}
.footer-right p {
  font-size: 12px;
  color: #888;
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .hero { padding: 80px 24px 60px; }
  .hero-deco { display: none; }
  .hero-actions { flex-direction: column; }
  .hero-actions .brutal-btn { width: 100%; text-align: center; }
  .features-grid { grid-template-columns: 1fr; }
  .demo-card { flex-direction: column; text-align: center; gap: 16px; }
  .demo-arrow { display: none; }
  .footer-inner { flex-direction: column; text-align: center; }
}
</style>
