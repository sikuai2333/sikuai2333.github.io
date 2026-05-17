<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const scrolled = ref(false)
const open = ref(false)
const links = [
  { label: '首页', href: '#hero' },
  { label: '博客', href: '#' },
  { label: '作品集', href: '#' },
  { label: '工具站', href: '#' },
]
onMounted(() => window.addEventListener('scroll', () => { scrolled.value = window.scrollY > 10 }, { passive: true }))
</script>

<template>
  <nav class="nav" :class="{ scrolled }">
    <div class="inner">
      <a class="logo" href="#hero"><span class="mark">◈</span><span>Portal</span></a>
      <button class="burger" :class="{ open }" @click="open = !open" aria-label="菜单"><i></i><i></i></button>
      <div class="links" :class="{ open }">
        <a v-for="l in links" :key="l.label" :href="l.href" class="link" @click="open=false">{{ l.label }}</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav{position:fixed;top:0;left:0;right:0;height:var(--nav-height);background:var(--color-bg-nav);backdrop-filter:saturate(180%) blur(24px);-webkit-backdrop-filter:saturate(180%) blur(24px);z-index:9999;border-bottom:1px solid transparent;transition:border-color .25s,background .25s}
.nav.scrolled{border-bottom-color:var(--color-divider);background:rgba(10,10,15,0.88)}
.inner{max-width:var(--max-width);margin:0 auto;height:100%;display:flex;align-items:center;justify-content:space-between;padding:0 28px}
.logo{display:flex;align-items:center;gap:8px;font-family:var(--font-display);font-size:18px;font-weight:600;letter-spacing:-0.02em}
.mark{color:var(--color-accent);font-size:20px;filter:drop-shadow(0 0 8px var(--color-accent-glow))}
.links{display:flex;gap:32px}
.link{font-size:14px;font-weight:500;color:var(--color-text-dim);position:relative;transition:color .25s}
.link::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:1.5px;background:var(--color-accent);transform:scaleX(0);transition:transform .25s}
.link:hover{color:var(--color-text)}
.link:hover::after{transform:scaleX(1)}
.burger{display:none;flex-direction:column;gap:5px;width:22px}
.burger i{display:block;height:1.5px;background:var(--color-text);border-radius:1px;transition:transform .25s}
.burger.open i:first-child{transform:rotate(45deg) translate(2px,4px)}
.burger.open i:last-child{transform:rotate(-45deg) translate(2px,-4px)}
@media(max-width:768px){
  .burger{display:flex}
  .links{position:fixed;top:var(--nav-height);left:0;right:0;background:rgba(10,10,15,0.95);backdrop-filter:blur(24px);flex-direction:column;align-items:center;gap:0;padding:24px 0;transform:translateY(-100%);opacity:0;pointer-events:none;transition:transform .25s,opacity .25s}
  .links.open{transform:translateY(0);opacity:1;pointer-events:auto}
  .link{font-size:16px;padding:14px 0}
}
</style>
