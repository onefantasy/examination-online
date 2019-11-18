import axios from 'axios'
import CONFIG from './config'
import webConfig from 'common/config.js'

/*
* config:{
*   url: String , //请求路径
*   params: {}, // 参数
* }
* */

export function getJSON(config){

  const instance = axios.create(CONFIG)

  // 请求拦截器
  /*instance.interceptors.request.use(config => {

  },err => {

  });*/

  // 响应拦截器
  instance.interceptors.response.use(response => {
    // 将token存入sesssionStorage
    response.data.token && window.sessionStorage.setItem('token',response.data.token)
    // 如果token超时，则跳转到登录页面
    response.data.isReLogin && (window.location.href = webConfig.address)
    return response
  },err => {
    // 请求失败的拦截
    console.warn('请求失败!')
  })

  return instance(config)
}

export function postJSON(url,data){
  const instance = axios.create(CONFIG)

  // 请求拦截器
  // instance.interceptors.request.use(config => {
  //   console.log('请求将携带的数据：',config);
  //   return config;
  // },err => {
  //   console.log('请求将携带的数据出错了:',err);
  //   return Promise.reject(err)
  // });

  // 响应拦截器
  instance.interceptors.response.use(response => {
    // 将token存入sessionStorage
    response.data.token && window.sessionStorage.setItem('token',response.data.token)
    //如果token超时，则跳转到登录页面
    response.data.isReLogin && (window.location.href = webConfig.address)

    return response
  },err => {
    // 请求失败的拦截
    console.warn('请求失败!')
  })

  const headers = {headers:{
    token: window.sessionStorage.getItem('token') || ''
  }}

  return instance.post(url,data,headers)
}