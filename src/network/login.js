import { getJSON,postJSON } from "./index"

export function provingId(data){
  return postJSON('/user/proving',data)
}

export function register(data){
  return postJSON('/user/register',data)
}
