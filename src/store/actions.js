const actions = {}

// 存入用户的账号信息
actions.setUser = (context,payload) => {
  context.commit('setUser',payload)
}

export default actions
