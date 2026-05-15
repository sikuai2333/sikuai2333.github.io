<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import NavGrid from './components/NavGrid.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import FooterSection from './components/FooterSection.vue'
import { useScrollReveal } from './composables/useScrollReveal'

useScrollReveal()
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <NavGrid />
    <FooterSection />
  </main>
  <MusicPlayer />
</template>

<style>
/* 全局过渡延迟，让卡片依次出现 */
.nav-grid .scroll-reveal:nth-child(1) { transition-delay: 0s; }
.nav-grid .scroll-reveal:nth-child(2) { transition-delay: 0.1s; }
.nav-grid .scroll-reveal:nth-child(3) { transition-delay: 0.2s; }
.nav-grid .scroll-reveal:nth-child(4) { transition-delay: 0.3s; }

/* 给 body 底部留空给固定播放器 */
body {
  padding-bottom: 0;
}
</style>
