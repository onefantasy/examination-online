import { provingId, register, getUserInfo, setUserInfo } from 'network/user.js'
import Vue from 'vue'

const state = {
  account: '',
  password: '',
  status: ''
}

const mutations = {
  SET_INFO(state,payload){
    for(let key of Object.keys(payload)){
      Vue.set(state,key,payload[key])
    }
  }
}

const actions = {
  // 登录
  login({commit,dispath},payload){
    return new Promise((resolve,reject) => {
      provingId(payload).then(res => {
        commit('SET_INFO', {status: res.data.data.status,...payload})
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 注册
  createUser({commit},payload){
    return new Promise((resolve,reject) => {
      register(payload).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 获取用户信息
  getInfo({commit},payload){
    return new Promise((resolve,reject) => {
      getUserInfo(payload).then(res => {
        commit('SET_INFO',res.data.data.data)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 设置用户信息
  setInfo({commit},payload){
    return new Promise((resolve,reject) => {
      setUserInfo(payload).then(res => {
        commit('SET_INFO',payload)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}