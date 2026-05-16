<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMockShop } from '@/composables/useMockShop'

const route = useRoute()
const { cartCount } = useMockShop()

const scrolled = ref(false)
const mobileOpen = ref(false)
const time = ref('')

const updateTime = () => {
  const now = new Date()
  time.value = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
}

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
  window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 10 }, { passive: true })
})
onUnmounted(() => clearInterval(timer))

const links = [
  { label: '首页', path: '/' },
  { label: '电商', path: '/shop' },
  { label: '知识库', path: '/knowledge' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <nav class="nav" :class="{ scrolled }">
    <div class="nav-inner">
      <router-link to="/" class="logo">
        <span class="logo-mark">◈</span>
        <span class="logo-text">NEUE BRUTAL</span>
      </router-link>

      <div class="nav-links" :class="{ open: mobileOpen }">
        <router-link
          v-for="l in links"
          :key="l.path"
          :to="l.path"
          class="nav-link"
          :class="{ active: isActive(l.path) }"
          @click="mobileOpen = false"
        >
          {{ l.label }}
        </router-link>
      </div>

      <div class="nav-right">
        <span class="nav-time">{{ time }}</span>
        <router-link to="/shop/cart" class="cart-btn">
          🛒
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </router-link>
        <button class="burger" :class="{ open: mobileOpen }" @click="mobileOpen = !mobileOpen">
          <i></i><i></i><i></i>
        </button>
      </div>
    </div>
  </nav>

  <main class="main-content">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-h);
  background: var(--brutal-bg);
  border-bottom: var(--brutal-border-w) solid var(--brutal-border);
  z-index: 9999;
  transition: box-shadow 0.2s;
}
.nav.scrolled {
  box-shadow: 0 4px 0 var(--brutal-border);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-mark {
  font-size: 24px;
  color: var(--brutal-accent);
}
.logo-text {
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  gap: 4px;
}
.nav-link {
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 2px solid transparent;
  transition: all 0.15s;
}
.nav-link:hover {
  border-color: var(--brutal-border);
}
.nav-link.active {
  background: var(--brutal-fg);
  color: var(--brutal-bg);
  border-color: var(--brutal-border);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}
.nav-time {
  font-family: 'SF Mono', 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  color: var(--brutal-muted);
  letter-spacing: 0.05em;
}
.cart-btn {
  position: relative;
  font-size: 20px;
  padding: 4px;
}
.cart-badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background: var(--brutal-accent);
  color: #fff;
  font-size: 10px;
  font-weight: 900;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--brutal-border);
}

.burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  width: 24px;
  padding: 4px 0;
}
.burger i {
  display: block;
  height: 3px;
  background: var(--brutal-fg);
  transition: all 0.2s;
}
.burger.open i:nth-child(1) { transform: rotate(45deg) translate(3px, 4px); }
.burger.open i:nth-child(2) { opacity: 0; }
.burger.open i:nth-child(3) { transform: rotate(-45deg) translate(3px, -4px); }

.main-content {
  padding-top: var(--nav-h);
  min-height: 100vh;
}

@media (max-width: 768px) {
  .nav-time { display: none; }
  .burger { display: flex; }
  .nav-links {
    position: fixed;
    top: var(--nav-h);
    left: 0;
    right: 0;
    background: var(--brutal-bg);
    border-bottom: var(--brutal-border-w) solid var(--brutal-border);
    flex-direction: column;
    padding: 16px;
    gap: 8px;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s;
  }
  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .nav-link {
    padding: 14px 20px;
    text-align: center;
    font-size: 15px;
  }
}
</style>
