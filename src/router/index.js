import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/seller',
    name: 'seller',
    component: () => import('../views/SellerList.vue'),
  },
  {
    path: "/seller/:id",
    component: () => import('../views/SellerInfo.vue'),
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/My.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/order/pay',
    name: 'pay',
    component: () => import('../views/Pay.vue')
  },
  {
    path: '/order/search',
    name: 'search',
    component: () => import('../views/OrderSearch.vue')
  },
  {
    path: '/user/collect',
    name: 'collect',
    component: () => import('../views/CollectSeller.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/admin/order',
    name: 'adminOrder',
    component: () => import('../views/AdminOrder.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
