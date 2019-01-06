import Vue from 'vue'
import App from './App.vue'

import store from './store/index'
import routes from './router/config'
import VueRouter from 'vue-router'
window.bus=new Vue()
Vue.use(VueRouter)
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

const router=new VueRouter({
  routes:routes
})
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: "<App/>"

})
