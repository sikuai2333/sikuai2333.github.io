import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/style/minimal' },
  { path: '/style/:style', name: 'style', component: () => import('@/views/StylePage.vue'), props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
