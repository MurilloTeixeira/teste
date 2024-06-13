import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    
    component: AboutView
    
  },
  {
    path: '/outro',
    name: 'outro',
    
    component: AboutView
    
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
