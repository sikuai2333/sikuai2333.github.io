<script setup lang="ts">
import NavCard from './NavCard.vue'

const cards = [
  {
    title: '博客', description: '记录想法与技术笔记', icon: '✎',
    href: '#',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
  },
  {
    title: '作品集', description: '个人项目与实验作品', icon: '◈',
    href: '#',
    gradient: 'linear-gradient(135deg, #2d1b3d 0%, #1b1b2f 50%, #162447 100%)'
  },
  {
    title: '工具站', description: '实用在线小工具合集', icon: '⚙',
    href: '#',
    gradient: 'linear-gradient(135deg, #1a2a1a 0%, #1b2e1b 50%, #0d3b2e 100%)'
  },
  {
    title: '更多', description: '更多有趣的东西正在路上', icon: '✦',
    href: '#',
    gradient: 'linear-gradient(135deg, #2a1a0a 0%, #2e1b0d 50%, #3b2d0d 100%)'
  }
]
</script>

<template>
  <section class="grid-section">
    <div class="grid">
      <NavCard v-for="card in cards" :key="card.title" v-bind="card" />
    </div>
  </section>
</template>

<style scoped>
.grid-section {
  max-width: var(--max-width); margin: 0 auto;
  padding: 0 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--section-gap);
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
