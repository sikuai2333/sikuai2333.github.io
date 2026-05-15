<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

const links = [
  { label: '首页', href: '#hero' },
  { label: '博客', href: '#' },
  { label: '作品集', href: '#' },
  { label: '工具站', href: '#' },
]

function onScroll() {
  scrolled.value = window.scrollY > 10
}

function scrollTo(href: string) {
  mobileOpen.value = false
  if (href.startsWith('#') && href.length > 1) {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav-inner">
      <a class="nav-logo" href="#" @click.prevent="scrollTo('#hero')">Portal</a>

      <button
        class="nav-toggle"
        :class="{ active: mobileOpen }"
        @click="mobileOpen = !mobileOpen"
        aria-label="菜单"
      >
        <span></span><span></span><span></span>
      </button>

      <div class="nav-links" :class="{ open: mobileOpen }">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          class="nav-link"
          @click.prevent="scrollTo(link.href)"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background: var(--color-bg-nav);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  z-index: 9999;
  transition: background var(--duration-fast) var(--ease-default);
}

.nav--scrolled {
  background: rgba(250, 250, 252, 0.92);
  box-shadow: 0 0 0 0.5px var(--color-divider);
}

.nav-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
}

.nav-logo {
  font-size: 17px;
  font-weight: var(--font-semibold);
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-link {
  font-size: 12px;
  color: var(--color-text);
  opacity: 0.8;
  transition: opacity var(--duration-fast) var(--ease-default);
  white-space: nowrap;
}

.nav-link:hover {
  opacity: 1;
}

/* 汉堡菜单 */
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  width: 18px;
  padding: 4px 0;
}

.nav-toggle span {
  display: block;
  height: 1px;
  background: var(--color-text);
  border-radius: 1px;
  transition: transform var(--duration-fast) var(--ease-default),
              opacity var(--duration-fast) var(--ease-default);
}

.nav-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(4px, 4px);
}
.nav-toggle.active span:nth-child(2) {
  opacity: 0;
}
.nav-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -4px);
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background: rgba(250, 250, 252, 0.97);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding: 20px 0;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform var(--duration-fast) var(--ease-default),
                opacity var(--duration-fast) var(--ease-default);
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    font-size: 17px;
    padding: 12px 0;
  }
}
</style>
