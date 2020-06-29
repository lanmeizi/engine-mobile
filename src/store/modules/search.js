const search = {
  namespaced: true,
  state: {
    searchArr: []
  },
  mutations: {
    setSearchArr: (state, key) => {
      state.searchArr = key
    }
  },
  actions: {
    updateSearchArr: ({
      commit
    }, key) => {
      commit('setSearchArr', key)
    }
  }
}

export default search