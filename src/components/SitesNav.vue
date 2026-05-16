<script setup lang="ts">
const sites = [
  { name: '个人主页', desc: '关于我的一切', emoji: '🏠', url: 'https://255654.xyz', color: '#ff6b35' },
  { name: '博客', desc: '技术文章与随笔', emoji: '📝', url: '#', color: '#6c63ff' },
  { name: '工具箱', desc: '在线实用工具集', emoji: '🧰', url: '#tools', color: '#2d8a4e' },
  { name: '摸鱼站', desc: '上班摸鱼好去处', emoji: '🐟', url: '#fun', color: '#e67e22' },
  { name: 'Web成就', desc: '互联网成就收集', emoji: '🏆', url: '#', color: '#9b59b6' },
  { name: '酷站导航', desc: '精选网站收藏', emoji: '🌐', url: '#', color: '#2980b9' },
]
</script>

<template>
  <section class="sites" id="sites">
    <div class="section-header">
      <h2 class="section-title">🌐 站点导航</h2>
      <p class="section-desc">我的小宇宙</p>
    </div>

    <div class="sites-grid">
      <a v-for="site in sites" :key="site.name" :href="site.url"
         class="site-card brutal-card" target="_blank" rel="noopener">
        <div class="site-emoji" :style="{ background: site.color }">{{ site.emoji }}</div>
        <div class="site-info">
          <h3>{{ site.name }}</h3>
          <p>{{ site.desc }}</p>
        </div>
        <span class="site-arrow">→</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.sites {
  padding: 48px 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.section-header { margin-bottom: 32px; }
.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}
.site-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  text-decoration: none;
  color: var(--fg);
  cursor: pointer;
}
.site-emoji {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border: 2px solid var(--border);
  flex-shrink: 0;
}
.site-info {
  flex: 1;
  min-width: 0;
}
.site-info h3 {
  font-size: 15px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.site-info p {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}
.site-arrow {
  font-size: 18px;
  font-weight: 900;
  color: var(--muted);
  transition: transform 0.2s;
}
.site-card:hover .site-arrow {
  transform: translateX(4px);
  color: var(--accent);
}

@media (max-width: 768px) {
  .sites-grid { grid-template-columns: 1fr; }
}
</style>
