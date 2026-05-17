<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const stats = ref([
  { label: '总用户', value: 12847, change: '+12%', icon: '👥' },
  { label: '活跃用户', value: 8923, change: '+8%', icon: '📈' },
  { label: '订单数', value: 3456, change: '+23%', icon: '📦' },
  { label: '收入', value: 892340, change: '+18%', icon: '💰' },
])

const recentOrders = ref([
  { id: 'ORD-001', user: '张三', product: '机械键盘', amount: 899, status: '已完成' },
  { id: 'ORD-002', user: '李四', product: '4K 显示器', amount: 2999, status: '处理中' },
  { id: 'ORD-003', user: '王五', product: '无线鼠标', amount: 299, status: '已发货' },
  { id: 'ORD-004', user: '赵六', product: 'USB-C 扩展坞', amount: 459, status: '待支付' },
  { id: 'ORD-005', user: '钱七', product: '降噪耳机', amount: 1299, status: '已完成' },
])

const activeTab = ref('overview')
const tabs = [
  { id: 'overview', label: '概览' },
  { id: 'orders', label: '订单' },
  { id: 'users', label: '用户' },
  { id: 'settings', label: '设置' },
]

const statusColor = (status: string) => {
  const colors: Record<string, string> = {
    '已完成': '#2d8a4e',
    '处理中': '#f39c12',
    '已发货': '#2980b9',
    '待支付': '#d63031',
  }
  return colors[status] || '#666'
}
</script>

<template>
<div class="dashboard-page">
  <header class="dash-header">
    <button class="back-btn" @click="router.push('/2')">← 返回</button>
    <h1>BRUTAL DASHBOARD</h1>
    <div class="user-info">
      <span>Admin</span>
      <div class="user-avatar">A</div>
    </div>
  </header>

  <div class="dash-layout">
    <aside class="dash-sidebar">
      <nav class="dash-nav">
        <button v-for="tab in tabs" :key="tab.id" class="nav-item" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
          {{ tab.label }}
        </button>
      </nav>
    </aside>

    <main class="dash-content">
      <div v-if="activeTab === 'overview'" class="overview">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <span class="stat-icon">{{ stat.icon }}</span>
            <div class="stat-info">
              <span class="stat-value">{{ stat.value.toLocaleString() }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
            <span class="stat-change" :class="{ positive: stat.change.startsWith('+') }">{{ stat.change }}</span>
          </div>
        </div>

        <div class="chart-placeholder">
          <h3>收入趋势</h3>
          <div class="chart">
            <div class="chart-bar" v-for="i in 12" :key="i" :style="{ height: Math.random() * 100 + '%' }"></div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'orders'" class="orders">
        <h2>最近订单</h2>
        <table class="orders-table">
          <thead>
            <tr>
              <th>订单号</th>
              <th>用户</th>
              <th>商品</th>
              <th>金额</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.user }}</td>
              <td>{{ order.product }}</td>
              <td>¥{{ order.amount }}</td>
              <td><span class="status-badge" :style="{ background: statusColor(order.status) }">{{ order.status }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="activeTab === 'users'" class="users">
        <h2>用户管理</h2>
        <p>用户列表功能开发中...</p>
      </div>

      <div v-else class="settings">
        <h2>系统设置</h2>
        <div class="setting-item">
          <span>通知</span>
          <button class="toggle-btn">开启</button>
        </div>
        <div class="setting-item">
          <span>深色模式</span>
          <button class="toggle-btn">关闭</button>
        </div>
      </div>
    </main>
  </div>

  <footer class="dash-footer">
    <p>© 2026 BRUTAL DASHBOARD · 示例后台</p>
  </footer>
</div>
</template>

<style scoped>
.dashboard-page{background:#f5f0e8;color:#1a1a1a;min-height:100vh}
.dash-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:3px solid #1a1a1a;background:#fff}
.back-btn{padding:8px 16px;border:3px solid #1a1a1a;background:#fff;font-weight:800;font-size:12px;text-transform:uppercase;cursor:pointer;transition:all 0.15s}
.back-btn:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #1a1a1a}
.dash-header h1{font-size:20px;font-weight:900;letter-spacing:0.05em}
.user-info{display:flex;align-items:center;gap:10px}
.user-avatar{width:36px;height:36px;border:3px solid #1a1a1a;background:#ff6b35;color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center}

.dash-layout{display:flex;min-height:calc(100vh - 140px)}
.dash-sidebar{width:200px;border-right:3px solid #1a1a1a;background:#fff}
.dash-nav{display:flex;flex-direction:column;padding:16px;gap:8px}
.nav-item{padding:12px;border:2px solid #1a1a1a;background:#fff;font-weight:700;font-size:13px;text-align:left;cursor:pointer;transition:all 0.15s}
.nav-item:hover,.nav-item.active{background:#1a1a1a;color:#fff}

.dash-content{flex:1;padding:24px}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;margin-bottom:24px}
.stat-card{display:flex;align-items:center;gap:16px;padding:20px;border:3px solid #1a1a1a;background:#fff;box-shadow:6px 6px 0 #1a1a1a}
.stat-icon{font-size:32px}
.stat-info{flex:1}
.stat-value{display:block;font-size:24px;font-weight:900}
.stat-label{font-size:12px;color:#666}
.stat-change{font-size:12px;font-weight:800;color:#d63031}
.stat-change.positive{color:#2d8a4e}

.chart-placeholder{padding:24px;border:3px solid #1a1a1a;background:#fff}
.chart-placeholder h3{font-size:16px;font-weight:800;text-transform:uppercase;margin-bottom:16px}
.chart{display:flex;align-items:flex-end;height:200px;gap:8px}
.chart-bar{flex:1;background:#ff6b35;transition:height 0.3s}

.orders h2{font-size:20px;font-weight:800;margin-bottom:20px}
.orders-table{width:100%;border-collapse:collapse}
.orders-table th,.orders-table td{padding:12px;border:2px solid #1a1a1a;text-align:left}
.orders-table th{background:#1a1a1a;color:#fff;font-weight:800}
.status-badge{padding:4px 10px;font-size:11px;font-weight:800;color:#fff;text-transform:uppercase}

.users h2,.settings h2{font-size:20px;font-weight:800;margin-bottom:20px}
.setting-item{display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:2px solid #eee}
.toggle-btn{padding:8px 16px;border:3px solid #1a1a1a;background:#fff;font-weight:700;font-size:12px;cursor:pointer}

.dash-footer{text-align:center;padding:16px;border-top:3px solid #1a1a1a;font-size:12px;color:#666}

@media(max-width:768px){.dash-layout{flex-direction:column}.dash-sidebar{width:100%;border-right:none;border-bottom:3px solid #1a1a1a}.dash-nav{flex-direction:row;overflow-x:auto}.stats-grid{grid-template-columns:1fr}}
</style>
