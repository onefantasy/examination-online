const actions = {}

// 存入用户的账号信息
actions.setUser = (store,payload) => {
  const user = store.state.user
  // 存储用户的信息
  /* for(let key of Object.keys(payload)){
    user[key] = payload[key]
  } */
  Object.assign(user,payload)
}


export default actions
