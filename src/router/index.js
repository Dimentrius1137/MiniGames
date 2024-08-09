import { createRouter, createWebHistory } from 'vue-router'
import Snake from '../pages/Snake.vue'
import Menu from '../pages/Menu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'snake',
      path: '/',
      component: Snake
    },
    {
      name: 'menu',
      path: '/menu',
      component: Menu
    }
    
  ]
})

export default router
