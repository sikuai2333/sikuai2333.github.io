<script setup lang="ts">
import { ref } from 'vue'
import { useMockShop } from '@/composables/useMockShop'

const { getProducts, categories, addToCart } = useMockShop()
const activeCategory = ref('全部')
const toast = ref('')

const handleAddToCart = (product: any) => {
  addToCart(product)
  toast.value = `${product.name} 已加入购物车`
  setTimeout(() => { toast.value = '' }, 2000)
}
</script>

<template>
  <div class="shop-home">
    <!-- Toast -->
    <transition name="toast">
      <div v-if="toast" class="toast">✓ {{ toast }}</div>
    </transition>

    <!-- HERO -->
    <section class="shop-hero">
      <h1>NEUE BRUTAL<br/>商店</h1>
      <p>用新野蛮风格设计的电商 Demo。每件商品都是 mock 数据，但交互是真实的。</p>
    </section>

    <!-- FILTERS -->
    <section class="filters">
      <div class="filters-inner">
        <button
          v-for="c in categories"
          :key="c"
          class="filter-btn"
          :class="{ active: activeCategory === c }"
          @click="activeCategory = c"
        >
          {{ c }}
        </button>
      </div>
    </section>

    <!-- PRODUCTS GRID -->
    <section class="products">
      <div class="products-grid">
        <div v-for="p in getProducts(activeCategory)" :key="p.id" class="product-card brutal-card">
          <router-link :to="`/shop/product/${p.id}`" class="product-link">
            <div class="product-img">
              <span class="product-emoji">{{ p.emoji }}</span>
              <span v-if="p.tag" class="product-tag brutal-badge">{{ p.tag }}</span>
            </div>
            <div class="product-info">
              <div class="product-category">{{ p.category }}</div>
              <h3 class="product-name">{{ p.name }}</h3>
              <div class="product-meta">
                <span class="product-rating">★ {{ p.rating }} ({{ p.reviews }})</span>
                <span class="product-stock">库存 {{ p.stock }}</span>
              </div>
              <div class="product-price-row">
                <span class="product-price">¥{{ p.price }}</span>
                <span v-if="p.originalPrice" class="product-original">¥{{ p.originalPrice }}</span>
              </div>
            </div>
          </router-link>
          <button class="brutal-btn sm add-btn" @click="handleAddToCart(p)">
            加入购物车
          </button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="shop-footer">
      <div class="footer-inner">
        <span>◈ NEUE BRUTAL SHOP</span>
        <span>ALL DATA IS MOCK · 2026</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.shop-home { padding-bottom: 0; }

/* Toast */
.toast {
  position: fixed;
  top: calc(var(--nav-h) + 16px);
  right: 24px;
  z-index: 10000;
  padding: 14px 24px;
  background: var(--brutal-success);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  border: 3px solid var(--brutal-border);
  box-shadow: var(--brutal-shadow-sm);
}
.toast-enter-active, .toast-leave-active { transition: all 0.2s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-12px); }

/* Hero */
.shop-hero {
  padding: 80px 24px 60px;
  max-width: 1200px;
  margin: 0 auto;
}
.shop-hero h1 {
  font-size: clamp(40px, 8vw, 72px);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.shop-hero p {
  font-size: 15px;
  color: var(--brutal-muted);
  max-width: 480px;
  line-height: 1.6;
}

/* Filters */
.filters {
  border-bottom: 3px solid var(--brutal-border);
  margin-bottom: 40px;
}
.filters-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  gap: 4px;
  overflow-x: auto;
}
.filter-btn {
  padding: 14px 24px;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 3px solid transparent;
  margin-bottom: -3px;
  transition: all 0.15s;
  white-space: nowrap;
}
.filter-btn:hover {
  border-bottom-color: var(--brutal-muted);
}
.filter-btn.active {
  border-bottom-color: var(--brutal-accent);
  color: var(--brutal-accent);
}

/* Products */
.products {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 80px;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}
.product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.product-link {
  text-decoration: none;
  color: inherit;
  flex: 1;
}
.product-img {
  position: relative;
  height: 200px;
  background: #f0ebe3;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid var(--brutal-border);
}
.product-emoji { font-size: 64px; }
.product-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--brutal-accent);
  color: #fff;
  border-color: var(--brutal-border);
}
.product-info { padding: 20px; flex: 1; }
.product-category {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--brutal-muted);
  margin-bottom: 8px;
}
.product-name {
  font-size: 16px;
  font-weight: 900;
  line-height: 1.3;
  margin-bottom: 10px;
}
.product-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--brutal-muted);
  margin-bottom: 12px;
}
.product-price-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.product-price {
  font-size: 24px;
  font-weight: 900;
  color: var(--brutal-accent);
}
.product-original {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}
.add-btn {
  margin: 0 20px 20px;
  width: calc(100% - 40px);
}

/* Footer */
.shop-footer {
  padding: 32px 24px;
  border-top: 3px solid var(--brutal-border);
  background: var(--brutal-fg);
  color: var(--brutal-bg);
}
.shop-footer .footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .products-grid { grid-template-columns: 1fr; }
  .shop-footer .footer-inner { flex-direction: column; gap: 8px; text-align: center; }
}
</style>
