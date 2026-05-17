<script setup lang="ts">
import NavCard from './NavCard.vue'
const cards = [
  { title:'博客', desc:'记录想法与技术笔记', icon:'✎', href:'/2/blog', bg:'linear-gradient(135deg,#1a1a2e,#0f3460)' },
  { title:'作品集', desc:'个人项目与实验作品', icon:'◈', href:'/2/portfolio', bg:'linear-gradient(135deg,#2d1b3d,#162447)' },
  { title:'工具站', desc:'实用在线小工具合集', icon:'⚙', href:'/2/tools', bg:'linear-gradient(135deg,#1a2a1a,#0d3b2e)' },
  { title:'更多', desc:'更多有趣的东西正在路上', icon:'✦', href:'/2/dashboard', bg:'linear-gradient(135deg,#2a1a0a,#3b2d0d)' },
]
</script>

<template>
  <section class="sec"><div class="grid"><NavCard v-for="c in cards" :key="c.title" v-bind="c" /></div></section>
</template>

<style scoped>
.sec{max-width:var(--max-width);margin:0 auto;padding:0 20px}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--section-gap)}
@media(max-width:640px){.grid{grid-template-columns:1fr}}
</style>
