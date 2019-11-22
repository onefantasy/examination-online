import axios from 'axios'
import CONFIG from './config'

import { MessageBox, Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: CONFIG.baseURL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: CONFIG.timeout // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    const token = window.sessionStorage.getItem('token')

    if (token) {
      // let each request carry tokent
      // ['token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = token
    }
    return config
  },
  error => {
    // do something with request error
    console.log('request error: ',error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 设置token
    response.data.token && window.sessionStorage.setItem('token',response.data.token)

    console.log('response data : ',response)

    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.errcode !== 0) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 5001: Illegal token; 50012: Other clients logged in; 5002: Token expired;
      if (res.errcode === 5001 || res.errcode === 5002 || res.errcode === 50012) {
        // to re-login
        MessageBox.alert('登录超时，请重新登录', '登出', {
          confirmButtonText: '重新登录',
          callback: action => {
            console.log('点击按钮操作：',action)
            window.location.href = '/'
          }
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('response error : ' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service