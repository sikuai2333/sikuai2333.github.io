<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMockShop } from '@/composables/useMockShop'

const route = useRoute()
const router = useRouter()
const { getProduct, addToCart, cartCount } = useMockShop()

const product = computed(() => getProduct(route.params.id as string))
const qty = ref(1)
const toast = ref('')

const handleAdd = () => {
  if (!product.value) return
  addToCart(product.value, qty.value)
  toast.value = `已将 ${qty.value} 件商品加入购物车`
  setTimeout(() => { toast.value = '' }, 2000)
}

const goToCart = () => {
  if (!product.value) return
  addToCart(product.value, qty.value)
  router.push('/shop/cart')
}
</script>

<template>
  <div class="product-page">
    <!-- Toast -->
    <transition name="toast">
      <div v-if="toast" class="toast">✓ {{ toast }}</div>
    </transition>

    <div v-if="product" class="product-detail">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link to="/shop">商店</router-link>
        <span class="sep">/</span>
        <span>{{ product.category }}</span>
        <span class="sep">/</span>
        <span class="current">{{ product.name }}</span>
      </div>

      <div class="detail-grid">
        <!-- Image -->
        <div class="detail-img brutal-card">
          <span class="img-emoji">{{ product.emoji }}</span>
        </div>

        <!-- Info -->
        <div class="detail-info">
          <span class="detail-category brutal-badge">{{ product.category }}</span>
          <h1>{{ product.name }}</h1>

          <div class="detail-meta">
            <span class="rating">★ {{ product.rating }}</span>
            <span class="reviews">{{ product.reviews }} 条评价</span>
            <span class="stock" :class="{ low: product.stock < 30 }">库存 {{ product.stock }} 件</span>
          </div>

          <div class="detail-price">
            <span class="price">¥{{ product.price }}</span>
            <span v-if="product.originalPrice" class="original">¥{{ product.originalPrice }}</span>
            <span v-if="product.originalPrice" class="discount">
              省 ¥{{ product.originalPrice - product.price }}
            </span>
          </div>

          <p class="detail-desc">{{ product.desc }}</p>

          <!-- Specs -->
          <div class="specs">
            <h3>规格参数</h3>
            <div v-for="s in product.specs" :key="s.label" class="spec-row">
              <span class="spec-label">{{ s.label }}</span>
              <span class="spec-value">{{ s.value }}</span>
            </div>
          </div>

          <!-- Quantity -->
          <div class="qty-section">
            <span class="qty-label">数量</span>
            <div class="qty-control">
              <button class="qty-btn" @click="qty = Math.max(1, qty - 1)">−</button>
              <span class="qty-num">{{ qty }}</span>
              <button class="qty-btn" @click="qty = Math.min(product.stock, qty + 1)">+</button>
            </div>
          </div>

          <!-- Actions -->
          <div class="detail-actions">
            <button class="brutal-btn" @click="handleAdd">加入购物车</button>
            <button class="brutal-btn success" @click="goToCart">立即购买</button>
          </div>

          <!-- Cart link -->
          <router-link v-if="cartCount > 0" to="/shop/cart" class="cart-link">
            🛒 购物车中有 {{ cartCount }} 件商品 →
          </router-link>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="not-found">
      <h2>商品不存在</h2>
      <router-link to="/shop" class="brutal-btn outline">返回商店</router-link>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

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

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--brutal-muted);
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.breadcrumb a { color: var(--brutal-accent); font-weight: 700; }
.sep { color: #ccc; }
.current { color: var(--brutal-fg); font-weight: 700; }

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.detail-img {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0ebe3;
  padding: 40px;
}
.img-emoji { font-size: 120px; }

.detail-category { margin-bottom: 16px; }
.detail-info h1 {
  font-size: 28px;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 16px;
}

.detail-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.rating { color: var(--brutal-warning); font-weight: 800; }
.reviews { color: var(--brutal-muted); }
.stock { color: var(--brutal-success); font-weight: 700; }
.stock.low { color: var(--brutal-danger); }

.detail-price {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f5f0;
  border: 2px solid #ddd;
}
.price { font-size: 32px; font-weight: 900; color: var(--brutal-accent); }
.original { font-size: 18px; color: #999; text-decoration: line-through; }
.discount {
  padding: 4px 10px;
  background: var(--brutal-danger);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
}

.detail-desc {
  font-size: 15px;
  line-height: 1.7;
  color: #444;
  margin-bottom: 28px;
}

.specs { margin-bottom: 28px; }
.specs h3 {
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}
.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 2px solid #eee;
  font-size: 14px;
}
.spec-label { color: var(--brutal-muted); }
.spec-value { font-weight: 700; }

.qty-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.qty-label { font-size: 14px; font-weight: 800; text-transform: uppercase; }
.qty-control {
  display: flex;
  align-items: center;
  border: 3px solid var(--brutal-border);
}
.qty-btn {
  width: 44px;
  height: 44px;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.qty-btn:hover { background: #eee; }
.qty-num {
  width: 48px;
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  border-left: 3px solid var(--brutal-border);
  border-right: 3px solid var(--brutal-border);
  line-height: 44px;
}

.detail-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.detail-actions .brutal-btn { flex: 1; }

.cart-link {
  display: block;
  text-align: center;
  padding: 12px;
  border: 2px dashed #ccc;
  font-size: 14px;
  font-weight: 700;
  color: var(--brutal-accent);
  transition: border-color 0.15s;
}
.cart-link:hover { border-color: var(--brutal-accent); }

.not-found {
  text-align: center;
  padding: 120px 24px;
}
.not-found h2 { font-size: 24px; margin-bottom: 24px; }

@media (max-width: 768px) {
  .detail-grid { grid-template-columns: 1fr; gap: 24px; }
  .detail-actions { flex-direction: column; }
}
</style>
