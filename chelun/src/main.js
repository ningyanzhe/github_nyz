import Vue from 'vue'
import App from './App.vue'

import store from './store/index'
import routes from './router/config'
import VueRouter from 'vue-router'
window.bus=new Vue()
Vue.use(VueRouter)

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
