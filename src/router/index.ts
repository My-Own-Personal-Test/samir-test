import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/loanList.vue'),
    },
    {
      path: '/detail/:user',
      name: 'deatil',
      component: () => import('../views/detailUser.vue'),
    },
  ],
})

export default router
