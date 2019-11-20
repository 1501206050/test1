import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/login.vue'
import Login1 from '../views/Login/login1.vue'
import Home from '../views/Home/home.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login1' },
  { path: '/login', name: 'login', component: Login },
  { path: '/login1', name: 'login1', component: Login1 },
  { path: '/home',
    name: 'home',
    redirect: '/welcome',
    component: Home,
    children: [
      { path: '/welcome', name: 'welcome', component: () => import('../views/Welcome/welcome.vue') },
      { path: '/users', name: 'users', component: () => import('../views/userAdmin/userList.vue') },
      { path: '/roles', name: 'roles', component: () => import('../views/permissionsAdmin/roleList.vue') },
      { path: '/rights', name: 'rights', component: () => import('../views/permissionsAdmin/permissions.vue') },
      { path: '/goods', name: 'goods', component: () => import('../views/goodsAdmin/goodsList.vue') },
      { path: '/params', name: 'params', component: () => import('../views/goodsAdmin/classParameter.vue') },
      { path: '/categories', name: 'categories', component: () => import('../views/goodsAdmin/categories.vue') },
      { path: '/orders', name: 'orders', component: () => import('../views/orderAdmin/ordersList.vue') },
      { path: '/reports', name: 'reports', component: () => import('../views/dataAdmin/reports.vue') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.path === '/login1') return next()
  var tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login1')
  next()
})
export default router
