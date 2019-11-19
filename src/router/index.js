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
  { path: '/home', name: 'home', component: Home }
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
