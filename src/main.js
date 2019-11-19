import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/fonts/iconfont.css'
import './plugins/element.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
