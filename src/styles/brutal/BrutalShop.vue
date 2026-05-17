<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const products = ref([
  { id: 1, name: '机械键盘 PRO', price: 899, category: '外设', image: '⌨️', stock: 15 },
  { id: 2, name: '4K 显示器', price: 2999, category: '显示器', image: '🖥️', stock: 8 },
  { id: 3, name: '无线鼠标', price: 299, category: '外设', image: '🖱️', stock: 23 },
  { id: 4, name: 'USB-C 扩展坞', price: 459, category: '配件', image: '🔌', stock: 12 },
  { id: 5, name: '降噪耳机', price: 1299, category: '音频', image: '🎧', stock: 6 },
  { id: 6, name: '摄像头 1080P', price: 399, category: '配件', image: '📷', stock: 18 },
])

const categories = ['全部', '外设', '显示器', '配件', '音频']
const activeCategory = ref('全部')
const cart = ref<{id: number, qty: number}[]>([])
const showCart = ref(false)

const filteredProducts = computed(() => {
  return activeCategory.value === '全部' ? products.value : products.value.filter(p => p.category === activeCategory.value)
})

const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => {
    const product = products.value.find(p => p.id === item.id)
    return sum + (product ? product.price * item.qty : 0)
  }, 0)
})

const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.qty, 0))

function addToCart(id: number) {
  const existing = cart.value.find(item => item.id === id)
  if (existing) {
    existing.qty++
  } else {
    cart.value.push({ id, qty: 1 })
  }
}

function removeFromCart(id: number) {
  cart.value = cart.value.filter(item => item.id !== id)
}
</script>

<template>
<div class="shop-page">
  <header class="shop-header">
    <button class="back-btn" @click="router.push('/2')">← 返回</button>
    <h1>BRUTAL SHOP</h1>
    <button class="cart-btn" @click="showCart = !showCart">
      🛒 购物车 ({{ cartCount }})
    </button>
  </header>

  <div v-if="showCart" class="cart-overlay">
    <div class="cart-panel">
      <h2>购物车</h2>
      <div v-if="cart.length === 0" class="empty-cart">购物车为空</div>
      <div v-else>
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <span>{{ products.find(p => p.id === item.id)?.name }}</span>
          <span>x{{ item.qty }}</span>
          <span>¥{{ (products.find(p => p.id === item.id)?.price || 0) * item.qty }}</span>
          <button class="remove-btn" @click="removeFromCart(item.id)">×</button>
        </div>
        <div class="cart-total">
          <span>总计:</span>
          <span>¥{{ cartTotal }}</span>
        </div>
        <button class="checkout-btn">结账 →</button>
      </div>
      <button class="close-cart" @click="showCart = false">关闭</button>
    </div>
  </div>

  <div class="shop-layout">
    <aside class="filter-sidebar">
      <h3>分类</h3>
      <button v-for="cat in categories" :key="cat" class="filter-btn" :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
        {{ cat }}
      </button>
    </aside>

    <main class="product-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <div class="product-image">{{ product.image }}</div>
        <h3>{{ product.name }}</h3>
        <p class="product-price">¥{{ product.price }}</p>
        <p class="product-stock">库存: {{ product.stock }}</p>
        <button class="add-btn" @click="addToCart(product.id)">加入购物车</button>
      </div>
    </main>
  </div>

  <footer class="shop-footer">
    <p>© 2026 BRUTAL SHOP · 示例电商</p>
  </footer>
</div>
</template>

<style scoped>
.shop-page{background:#f5f0e8;color:#1a1a1a;min-height:100vh}
.shop-header{display:flex;justify-content:space-between;align-items:center;padding:20px;border-bottom:3px solid #1a1a1a;background:#fff}
.back-btn{padding:8px 16px;border:3px solid #1a1a1a;background:#fff;font-weight:800;font-size:12px;text-transform:uppercase;cursor:pointer;transition:all 0.15s}
.back-btn:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #1a1a1a}
.shop-header h1{font-size:24px;font-weight:900;letter-spacing:0.05em}
.cart-btn{padding:10px 20px;border:3px solid #1a1a1a;background:#ff6b35;color:#fff;font-weight:800;font-size:13px;cursor:pointer;transition:all 0.15s}
.cart-btn:hover{transform:translate(2px,2px)}

.cart-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;justify-content:flex-end}
.cart-panel{width:350px;background:#fff;padding:24px;overflow-y:auto;border-left:3px solid #1a1a1a}
.cart-panel h2{font-size:20px;font-weight:900;text-transform:uppercase;margin-bottom:20px}
.empty-cart{text-align:center;padding:40px;color:#666}
.cart-item{display:flex;justify-content:space-between;align-items:center;padding:12px;border-bottom:2px solid #eee}
.cart-total{display:flex;justify-content:space-between;padding:16px;font-weight:800;font-size:18px;border-top:3px solid #1a1a1a;margin-top:16px}
.checkout-btn{width:100%;padding:16px;border:3px solid #1a1a1a;background:#ff6b35;color:#fff;font-weight:800;font-size:16px;text-transform:uppercase;cursor:pointer;margin-top:16px;transition:all 0.15s}
.checkout-btn:hover{transform:translate(2px,2px)}
.remove-btn{background:none;border:none;font-size:18px;cursor:pointer;color:#d63031}
.close-cart{width:100%;padding:12px;border:3px solid #1a1a1a;background:#fff;font-weight:800;margin-top:12px;cursor:pointer}

.shop-layout{display:flex;max-width:1200px;margin:0 auto;padding:20px;gap:20px}
.filter-sidebar{width:200px;flex-shrink:0}
.filter-sidebar h3{font-size:14px;font-weight:800;text-transform:uppercase;margin-bottom:12px;letter-spacing:0.05em}
.filter-btn{display:block;width:100%;padding:10px;border:2px solid #1a1a1a;background:#fff;margin-bottom:8px;font-weight:700;font-size:13px;cursor:pointer;transition:all 0.15s}
.filter-btn:hover,.filter-btn.active{background:#1a1a1a;color:#fff}

.product-grid{flex:1;display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}
.product-card{padding:20px;border:3px solid #1a1a1a;background:#fff;box-shadow:6px 6px 0 #1a1a1a;transition:all 0.15s;text-align:center}
.product-card:hover{transform:translate(3px,3px);box-shadow:3px 3px 0 #1a1a1a}
.product-image{font-size:48px;margin-bottom:16px}
.product-card h3{font-size:16px;font-weight:800;text-transform:uppercase;margin-bottom:8px}
.product-price{font-size:20px;font-weight:900;color:#ff6b35;margin-bottom:4px}
.product-stock{font-size:12px;color:#666;margin-bottom:16px}
.add-btn{padding:12px 24px;border:3px solid #1a1a1a;background:#1a1a1a;color:#fff;font-weight:800;font-size:12px;text-transform:uppercase;cursor:pointer;transition:all 0.15s}
.add-btn:hover{background:#ff6b35}

.shop-footer{text-align:center;padding:40px 20px;border-top:3px solid #1a1a1a;font-size:13px;color:#666;letter-spacing:0.05em}

@media(max-width:768px){.shop-layout{flex-direction:column}.filter-sidebar{width:100%}.product-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr))}}
</style>
