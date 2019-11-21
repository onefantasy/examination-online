import { getJSON,postJSON } from "./index"
import service from "./index"

// 登录验证2
export function provingId(data){
  return service({
    url: '/user/proving',
    method: 'post',
    data
  })
}

// 注册
export function register(data){
  return service({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo(data){
  return service({
    url: '/user/getInfo',
    method: 'post',
    data
  })
}

// 设置用户信息
export function setUserInfo(data){
  return service({
    url: '/user/setInfo',
    method: 'post',
    data
  })
}