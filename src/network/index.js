import axios from 'axios';
import { baseURL,timeout } from './config';

/*
* config:{
*   url: String , //请求路径
*   params: {}, // 参数
* }
* */

export function getJSON(config){
  const instance = axios.create({
    baseURL,
    timeout,
  });

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

  return instance(config);
}

export function postJSON(url,data){
  const instance = axios.create({
    baseURL,
    timeout,
  });

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
    return response
   },err => {
    // 请求失败的拦截
    console.warn('请求失败!')
   });

  return instance.post(url,data);
}
