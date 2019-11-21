import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import user from './modules/user'

// 1. 安装
Vue.use(Vuex)

const state = {
  // 用户信息
  user:{account: '',password:'',status: ''},
}

// 2. 实例化对象
let store = new Vuex.Store({
  modules:{
    user
  },
  getters,
})

// 3.导出到main.js文件中进心挂载
export default store
