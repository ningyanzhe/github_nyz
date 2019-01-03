import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import app from './modules/app'
import camera from './modules/camera'
import changecity from './modules/camera'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    app,
    camera,
    changecity
  },
  plugins: [createLogger()]
})