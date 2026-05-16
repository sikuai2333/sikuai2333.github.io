<script setup lang="ts">
</script>

<template>
  <div class="not-found-page">
    <div class="content">
      <div class="error-code">404</div>
      <h1>PAGE NOT FOUND</h1>
      <p>你访问的页面不存在，或者已经被移动到了其他位置。</p>
      <div class="actions">
        <router-link to="/" class="brutal-btn">返回首页 →</router-link>
        <router-link to="/shop" class="brutal-btn outline">去逛逛商店</router-link>
      </div>
      <div class="deco">
        <div class="deco-block d1"></div>
        <div class="deco-block d2"></div>
        <div class="deco-block d3"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: calc(100vh - var(--nav-h));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}
.content {
  text-align: center;
  position: relative;
}
.error-code {
  font-size: clamp(100px, 20vw, 200px);
  font-weight: 900;
  line-height: 1;
  color: #ddd;
  margin-bottom: 16px;
  letter-spacing: -0.05em;
}
h1 {
  font-size: clamp(20px, 4vw, 32px);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}
p {
  font-size: 15px;
  color: var(--brutal-muted);
  max-width: 400px;
  margin: 0 auto 32px;
  line-height: 1.6;
}
.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.deco {
  position: absolute;
  inset: -40px;
  pointer-events: none;
  z-index: -1;
}
.deco-block {
  position: absolute;
  border: 3px solid var(--brutal-border);
  opacity: 0.06;
}
.d1 { width: 120px; height: 120px; top: 0; left: -20px; background: var(--brutal-accent); transform: rotate(12deg); }
.d2 { width: 80px; height: 80px; bottom: 20px; right: -10px; background: var(--brutal-fg); transform: rotate(-8deg); }
.d3 { width: 60px; height: 60px; top: 30%; right: 5%; background: var(--brutal-accent); }
</style>
