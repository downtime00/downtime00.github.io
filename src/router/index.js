import { createRouter, createWebHistory } from 'vue-router'
import BabylonView from '../views/BabylonView.vue'

const routes = [
  {
    path: '/',
    name: 'BabylonView',
    component: BabylonView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/babylon',
    name: 'babylon',
    component: () => import(/* webpackChunkName: "about" */ '../views/BabylonView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
