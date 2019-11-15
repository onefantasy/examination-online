const mutations = {}

// 设置用户信息
mutations.setUser = (state, payload) => {
  state.user = {...state.user,...payload}
}

export default mutations