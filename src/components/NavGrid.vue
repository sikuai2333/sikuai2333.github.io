<script setup lang="ts">
import NavCard from './NavCard.vue'

const cards = [
  {
    title: '博客',
    description: '记录想法与技术笔记',
    icon: '📝',
    href: '#',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    title: '作品集',
    description: '个人项目与实验作品',
    icon: '🎨',
    href: '#',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    title: '工具站',
    description: '实用在线小工具合集',
    icon: '🛠',
    href: '#',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    title: '更多',
    description: '更多有趣的东西正在路上',
    icon: '✨',
    href: '#',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
]
</script>

<template>
  <section class="nav-grid-section">
    <div class="nav-grid">
      <NavCard
        v-for="card in cards"
        :key="card.title"
        v-bind="card"
      />
    </div>
  </section>
</template>

<style scoped>
.nav-grid-section {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 6px;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--section-gap);
}

@media (max-width: 768px) {
  .nav-grid {
    grid-template-columns: 1fr;
  }
}
</style>
