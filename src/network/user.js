import { getJSON,postJSON } from "./index"

// 登陆验证
export function provingId(data){
  return postJSON('/user/proving',data)
}

// 注册
export function register(data){
  return postJSON('/user/register',data)
}

// 获取用户信息
export function getUserInfo(data){
  return postJSON('/user/getInfo',data)
}

