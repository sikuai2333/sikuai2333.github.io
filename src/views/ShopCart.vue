<script setup lang="ts">
import { useMockShop } from '@/composables/useMockShop'

const { cart, cartTotal, cartCount, removeFromCart, updateQty } = useMockShop()
</script>

<template>
  <div class="cart-page">
    <h1 class="page-title">购物车</h1>

    <div v-if="cart.length > 0" class="cart-content">
      <div class="cart-items">
        <!-- Header -->
        <div class="cart-header">
          <span class="col-product">商品</span>
          <span class="col-price">单价</span>
          <span class="col-qty">数量</span>
          <span class="col-total">小计</span>
          <span class="col-action"></span>
        </div>

        <!-- Items -->
        <div v-for="item in cart" :key="item.product.id" class="cart-item">
          <div class="col-product">
            <router-link :to="`/shop/product/${item.product.id}`" class="item-info">
              <span class="item-emoji">{{ item.product.emoji }}</span>
              <div>
                <div class="item-name">{{ item.product.name }}</div>
                <div class="item-cat">{{ item.product.category }}</div>
              </div>
            </router-link>
          </div>
          <div class="col-price">¥{{ item.product.price }}</div>
          <div class="col-qty">
            <div class="qty-control">
              <button class="qty-btn" @click="updateQty(item.product.id, item.qty - 1)">−</button>
              <span class="qty-num">{{ item.qty }}</span>
              <button class="qty-btn" @click="updateQty(item.product.id, item.qty + 1)">+</button>
            </div>
          </div>
          <div class="col-total">¥{{ item.product.price * item.qty }}</div>
          <div class="col-action">
            <button class="remove-btn" @click="removeFromCart(item.product.id)">✕</button>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="cart-summary brutal-card">
        <h3>订单摘要</h3>
        <div class="summary-row">
          <span>商品数量</span>
          <span>{{ cartCount }} 件</span>
        </div>
        <div class="summary-row">
          <span>商品金额</span>
          <span>¥{{ cartTotal }}</span>
        </div>
        <div class="summary-row">
          <span>运费</span>
          <span class="free">免运费</span>
        </div>
        <hr class="brutal-divider" />
        <div class="summary-row total">
          <span>合计</span>
          <span>¥{{ cartTotal }}</span>
        </div>
        <router-link to="/shop/checkout" class="brutal-btn checkout-btn">
          去结算 →
        </router-link>
        <router-link to="/shop" class="continue-link">← 继续购物</router-link>
      </div>
    </div>

    <!-- Empty -->
    <div v-else class="cart-empty">
      <span class="empty-icon">🛒</span>
      <h2>购物车是空的</h2>
      <p>还没有添加任何商品</p>
      <router-link to="/shop" class="brutal-btn">去购物 →</router-link>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}
.page-title {
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 32px;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;
}

/* Cart Items */
.cart-items { display: flex; flex-direction: column; }
.cart-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 40px;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 3px solid var(--brutal-border);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--brutal-muted);
}
.cart-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 40px;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 2px solid #eee;
  align-items: center;
}
.item-info {
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
}
.item-emoji { font-size: 36px; }
.item-name { font-size: 14px; font-weight: 800; }
.item-cat { font-size: 12px; color: var(--brutal-muted); margin-top: 2px; }
.col-price { font-size: 14px; font-weight: 700; }
.col-total { font-size: 16px; font-weight: 900; color: var(--brutal-accent); }

.qty-control {
  display: inline-flex;
  align-items: center;
  border: 2px solid var(--brutal-border);
}
.qty-btn {
  width: 32px;
  height: 32px;
  font-size: 16px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}
.qty-btn:hover { background: #eee; }
.qty-num {
  width: 36px;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  border-left: 2px solid var(--brutal-border);
  border-right: 2px solid var(--brutal-border);
  line-height: 32px;
}

.remove-btn {
  width: 32px;
  height: 32px;
  font-size: 14px;
  font-weight: 900;
  border: 2px solid var(--brutal-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.remove-btn:hover {
  background: var(--brutal-danger);
  color: #fff;
}

/* Summary */
.cart-summary {
  padding: 28px;
  position: sticky;
  top: calc(var(--nav-h) + 24px);
}
.cart-summary h3 {
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 8px 0;
}
.summary-row.total {
  font-size: 20px;
  font-weight: 900;
  padding: 12px 0;
}
.free { color: var(--brutal-success); font-weight: 700; }
.checkout-btn {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
  padding: 16px;
}
.continue-link {
  display: block;
  text-align: center;
  margin-top: 16px;
  font-size: 13px;
  font-weight: 700;
  color: var(--brutal-muted);
}
.continue-link:hover { color: var(--brutal-accent); }

/* Empty */
.cart-empty {
  text-align: center;
  padding: 80px 24px;
}
.empty-icon { font-size: 64px; display: block; margin-bottom: 24px; }
.cart-empty h2 { font-size: 24px; margin-bottom: 8px; }
.cart-empty p { color: var(--brutal-muted); margin-bottom: 24px; }

@media (max-width: 768px) {
  .cart-content { grid-template-columns: 1fr; }
  .cart-header { display: none; }
  .cart-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .col-product { order: 1; }
  .col-price { order: 2; }
  .col-qty { order: 3; }
  .col-total { order: 4; font-size: 18px; }
  .col-action { order: 5; }
  .cart-summary { position: static; }
}
</style>
