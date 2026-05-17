import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/2' },
  {
    path: '/:style',
    name: 'style',
    component: () => import('@/views/StylePage.vue'),
    props: true,
    children: [
      {
        path: 'blog',
        name: 'brutal-blog',
        component: () => import('@/styles/brutal/BrutalBlog.vue'),
      },
      {
        path: 'shop',
        name: 'brutal-shop',
        component: () => import('@/styles/brutal/BrutalShop.vue'),
      },
      {
        path: 'docs',
        name: 'brutal-docs',
        component: () => import('@/styles/brutal/BrutalDocs.vue'),
      },
      {
        path: 'tools',
        name: 'brutal-tools',
        component: () => import('@/styles/brutal/BrutalTools.vue'),
      },
      {
        path: 'portfolio',
        name: 'brutal-portfolio',
        component: () => import('@/styles/brutal/BrutalPortfolio.vue'),
      },
      {
        path: 'dashboard',
        name: 'brutal-dashboard',
        component: () => import('@/styles/brutal/BrutalDashboard.vue'),
      },
    ],
  },
]

export default createRouter({ history: createWebHistory(), routes })
