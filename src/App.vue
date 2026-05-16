<script setup lang="ts">
import { ref } from 'vue'
import { useTime } from '@/composables/useTime'
import { useQuotes } from '@/composables/useQuotes'

const { time, date, weekday } = useTime()
const menuOpen = ref(false)

const navLinks = [
  { name: '🏠 首页', path: '/' },
  { name: '📝 博客', href: '#' },
  { name: '🧰 工具箱', href: '#tools' },
  { name: '🎮 摸鱼', href: '#fun' },
  { name: '🌐 导航', href: '#sites' },
]
</script>

<template>
  <header class="nav">
    <div class="nav-inner">
      <router-link to="/" class="nav-logo">
        <span class="logo-996">996</span><span class="logo-2333">2333</span>
      </router-link>

      <div class="nav-meta">
        <span class="nav-clock">{{ time }}</span>
        <span class="nav-date">{{ date }} {{ weekday }}</span>
      </div>

      <nav class="nav-links" :class="{ open: menuOpen }">
        <a v-for="link in navLinks" :key="link.name" :href="link.href || link.path" @click="menuOpen = false">
          {{ link.name }}
        </a>
      </nav>

      <button class="nav-hamburger" @click="menuOpen = !menuOpen" aria-label="菜单">
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>
  </header>

  <main class="main-content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <span>© 2026 9962333.xyz — 笑着加班</span>
      <span class="footer-tagline">打工人的快乐星球 🪐</span>
    </div>
  </footer>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--fg);
  color: var(--bg);
  height: var(--nav-h);
  border-bottom: var(--border-w) solid var(--accent);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
}
.nav-logo {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.logo-996 { color: var(--accent); }
.logo-2333 { color: #6c63ff; }
.nav-meta {
  display: flex;
  flex-direction: column;
  font-size: 11px;
  line-height: 1.3;
  opacity: 0.7;
  white-space: nowrap;
}
.nav-clock { font-weight: 800; font-variant-numeric: tabular-nums; }
.nav-links {
  display: flex;
  gap: 4px;
  margin-left: auto;
}
.nav-links a {
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 0;
  transition: background 0.15s;
  white-space: nowrap;
}
.nav-links a:hover {
  background: rgba(255,255,255,0.1);
}
.nav-hamburger {
  display: none;
  width: 40px;
  height: 40px;
  margin-left: auto;
  position: relative;
}
.nav-hamburger span,
.nav-hamburger span::before,
.nav-hamburger span::after {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--bg);
  position: absolute;
  left: 9px;
  transition: all 0.3s;
}
.nav-hamburger span { top: 19px; }
.nav-hamburger span::before { content: ''; top: -7px; }
.nav-hamburger span::after { content: ''; top: 7px; }
.nav-hamburger span.open { background: transparent; }
.nav-hamburger span.open::before { top: 0; transform: rotate(45deg); }
.nav-hamburger span.open::after { top: 0; transform: rotate(-45deg); }

.main-content {
  min-height: calc(100vh - var(--nav-h) - 60px);
}

.footer {
  background: var(--fg);
  color: var(--bg);
  border-top: var(--border-w) solid var(--accent);
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
.footer-tagline { opacity: 0.6; }

@media (max-width: 768px) {
  .nav-meta { display: none; }
  .nav-hamburger { display: block; }
  .nav-links {
    display: none;
    position: absolute;
    top: var(--nav-h);
    left: 0;
    right: 0;
    background: var(--fg);
    flex-direction: column;
    padding: 8px 0;
    border-bottom: var(--border-w) solid var(--accent);
  }
  .nav-links.open { display: flex; }
  .footer-inner { flex-direction: column; gap: 4px; text-align: center; }
}
</style>
