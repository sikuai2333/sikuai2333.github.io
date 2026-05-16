<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMockShop } from '@/composables/useMockShop'

const router = useRouter()
const { cart, cartTotal, cartCount, clearCart } = useMockShop()

const form = ref({
  name: '',
  phone: '',
  address: '',
  note: '',
})
const submitted = ref(false)
const submitting = ref(false)
const errors = ref<Record<string, string>>({})

const validate = () => {
  errors.value = {}
  if (!form.value.name.trim()) errors.value.name = '请输入收件人姓名'
  if (!form.value.phone.trim()) errors.value.phone = '请输入手机号'
  else if (!/^1\d{10}$/.test(form.value.phone)) errors.value.phone = '手机号格式不正确'
  if (!form.value.address.trim()) errors.value.address = '请输入收货地址'
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (!validate()) return
  submitting.value = true
  // 模拟提交
  setTimeout(() => {
    submitting.value = false
    submitted.value = true
    clearCart()
  }, 1500)
}
</script>

<template>
  <div class="checkout-page">
    <h1 class="page-title">结算</h1>

    <!-- Success -->
    <div v-if="submitted" class="success-panel brutal-card">
      <span class="success-icon">✓</span>
      <h2>订单提交成功</h2>
      <p>这是一个 mock 演示，没有真实下单。但交互流程是完整的。</p>
      <div class="success-details">
        <div class="detail-row">
          <span>订单号</span>
          <span>NB-{{ Date.now().toString().slice(-8) }}</span>
        </div>
        <div class="detail-row">
          <span>收件人</span>
          <span>{{ form.name }}</span>
        </div>
        <div class="detail-row">
          <span>手机号</span>
          <span>{{ form.phone }}</span>
        </div>
        <div class="detail-row">
          <span>收货地址</span>
          <span>{{ form.address }}</span>
        </div>
      </div>
      <div class="success-actions">
        <router-link to="/shop" class="brutal-btn">继续购物 →</router-link>
        <router-link to="/" class="brutal-btn outline">返回首页</router-link>
      </div>
    </div>

    <!-- Checkout Form -->
    <div v-else class="checkout-content">
      <div class="checkout-form">
        <h2 class="form-section-title">收货信息</h2>
        <div class="form-group">
          <label>收件人 <span class="required">*</span></label>
          <input
            v-model="form.name"
            class="brutal-input"
            :class="{ error: errors.name }"
            placeholder="请输入姓名"
          />
          <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <label>手机号 <span class="required">*</span></label>
          <input
            v-model="form.phone"
            class="brutal-input"
            :class="{ error: errors.phone }"
            placeholder="请输入手机号"
            maxlength="11"
          />
          <span v-if="errors.phone" class="error-msg">{{ errors.phone }}</span>
        </div>
        <div class="form-group">
          <label>收货地址 <span class="required">*</span></label>
          <textarea
            v-model="form.address"
            class="brutal-input"
            :class="{ error: errors.address }"
            placeholder="请输入详细地址"
            rows="3"
          ></textarea>
          <span v-if="errors.address" class="error-msg">{{ errors.address }}</span>
        </div>
        <div class="form-group">
          <label>备注</label>
          <input
            v-model="form.note"
            class="brutal-input"
            placeholder="选填，有什么要备注的？"
          />
        </div>

        <h2 class="form-section-title">支付方式</h2>
        <div class="payment-methods">
          <label class="payment-option brutal-card">
            <input type="radio" name="pay" value="wechat" checked />
            <span class="pay-icon">💚</span>
            <span>微信支付</span>
          </label>
          <label class="payment-option brutal-card">
            <input type="radio" name="pay" value="alipay" />
            <span class="pay-icon">🔵</span>
            <span>支付宝</span>
          </label>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="checkout-summary brutal-card">
        <h3>订单确认</h3>
        <div class="order-items">
          <div v-for="item in cart" :key="item.product.id" class="order-item">
            <span class="oi-emoji">{{ item.product.emoji }}</span>
            <div class="oi-info">
              <div class="oi-name">{{ item.product.name }}</div>
              <div class="oi-meta">× {{ item.qty }}</div>
            </div>
            <span class="oi-price">¥{{ item.product.price * item.qty }}</span>
          </div>
        </div>
        <hr class="brutal-divider" />
        <div class="summary-row">
          <span>商品 ({{ cartCount }} 件)</span>
          <span>¥{{ cartTotal }}</span>
        </div>
        <div class="summary-row">
          <span>运费</span>
          <span class="free">免运费</span>
        </div>
        <div class="summary-row total">
          <span>合计</span>
          <span>¥{{ cartTotal }}</span>
        </div>
        <button
          class="brutal-btn submit-btn"
          :class="{ disabled: submitting || cart.length === 0 }"
          :disabled="submitting || cart.length === 0"
          @click="handleSubmit"
        >
          {{ submitting ? '提交中...' : '提交订单' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-page {
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

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  align-items: start;
}

.form-section-title {
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 3px solid var(--brutal-border);
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}
.required { color: var(--brutal-danger); }
.brutal-input { width: 100%; }
.brutal-input.error { border-color: var(--brutal-danger); }
textarea.brutal-input { resize: vertical; }
.error-msg {
  display: block;
  font-size: 12px;
  color: var(--brutal-danger);
  font-weight: 700;
  margin-top: 6px;
}

.payment-methods {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.payment-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  cursor: pointer;
  flex: 1;
  min-width: 160px;
}
.payment-option input[type="radio"] { accent-color: var(--brutal-accent); }
.pay-icon { font-size: 20px; }

/* Summary */
.checkout-summary {
  padding: 28px;
  position: sticky;
  top: calc(var(--nav-h) + 24px);
}
.checkout-summary h3 {
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.order-items { margin-bottom: 16px; }
.order-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 2px solid #eee;
}
.oi-emoji { font-size: 24px; }
.oi-info { flex: 1; }
.oi-name { font-size: 13px; font-weight: 700; }
.oi-meta { font-size: 12px; color: var(--brutal-muted); }
.oi-price { font-size: 14px; font-weight: 800; }

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 8px 0;
}
.summary-row.total { font-size: 20px; font-weight: 900; padding: 12px 0; }
.free { color: var(--brutal-success); font-weight: 700; }
.submit-btn {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
  padding: 16px;
}
.submit-btn.disabled { opacity: 0.5; cursor: not-allowed; }

/* Success */
.success-panel {
  max-width: 600px;
  margin: 0 auto;
  padding: 48px;
  text-align: center;
}
.success-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 3px solid var(--brutal-success);
  font-size: 32px;
  font-weight: 900;
  color: var(--brutal-success);
  margin-bottom: 24px;
}
.success-panel h2 { font-size: 24px; margin-bottom: 8px; }
.success-panel > p { color: var(--brutal-muted); margin-bottom: 28px; }
.success-details {
  text-align: left;
  border: 2px solid #ddd;
  padding: 20px;
  margin-bottom: 28px;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.detail-row:last-child { border-bottom: none; }
.detail-row span:first-child { color: var(--brutal-muted); }
.detail-row span:last-child { font-weight: 700; }
.success-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

@media (max-width: 768px) {
  .checkout-content { grid-template-columns: 1fr; }
  .checkout-summary { position: static; }
  .payment-methods { flex-direction: column; }
  .success-actions { flex-direction: column; }
}
</style>
