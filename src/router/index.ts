import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/ShowcaseHome.vue'),
  },
  // === 电商 Demo ===
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/views/ShopHome.vue'),
  },
  {
    path: '/shop/product/:id',
    name: 'shop-product',
    component: () => import('@/views/ShopProduct.vue'),
  },
  {
    path: '/shop/cart',
    name: 'shop-cart',
    component: () => import('@/views/ShopCart.vue'),
  },
  {
    path: '/shop/checkout',
    name: 'shop-checkout',
    component: () => import('@/views/ShopCheckout.vue'),
  },
  // === 知识库 Demo ===
  {
    path: '/knowledge',
    name: 'knowledge',
    component: () => import('@/views/KnowledgeHome.vue'),
  },
  {
    path: '/knowledge/article/:id',
    name: 'knowledge-article',
    component: () => import('@/views/KnowledgeArticle.vue'),
  },
  // === 404 ===
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
  },
]

export default createRouter({ history: createWebHistory(), routes })
