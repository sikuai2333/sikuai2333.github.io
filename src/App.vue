<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import NavGrid from './components/NavGrid.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import FooterSection from './components/FooterSection.vue'

onMounted(() => {
  const els = document.querySelectorAll('.scroll-reveal')
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('is-visible'), i * 80)
          obs.unobserve(e.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )
  els.forEach(el => obs.observe(el))
})
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
