const changeVersion = {
  namespaced: true,
  state: {
    changeFlag: true
  },
  mutations: {
    setChangeFlag: (state, key) => {
      state.changeFlag = key
    }
  }
}

export default changeVersion
