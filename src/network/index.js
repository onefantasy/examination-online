import axios from 'axios'
import CONFIG from './config'

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
  /*instance.interceptors.response.use(response => {
    // 请求成功的拦截

  },err => {
    // 请求失败的拦截

  });*/

  return instance(config)
}

export function postJSON(url,data){
  const instance = axios.create(CONFIG)

  // 请求拦截器
  /*instance.interceptors.request.use(config => {
    console.log('请求将携带的数据：',config);
    return config;
  },err => {
    console.log('请求将携带的数据出错了:',err);
    return Promise.reject(err)
  });
*/
  // 响应拦截器
   instance.interceptors.response.use(response => {
    // 请求成功的拦截
    // console.log('请求响应的数据类型：',typeof response.data);
    // 获取响应请求的里面的请求头
    console.log('请求头中的数据：',response.headers)
    return response
   },err => {
    // 请求失败的拦截
    console.warn('请求失败!')
   })

  return instance.post(url,data)
}
