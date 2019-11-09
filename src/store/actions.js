const actions = {}

// 存入用户的账号信息
actions.setUser = (store,payload) => {
  const user = store.state.user
  user.account = payload.account
  user.password = payload.password
  user.status = payload.status
}


export default actions
