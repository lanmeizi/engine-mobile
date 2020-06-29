const fixedFolder = {
  namespaced: true,
  state: {
    fixedFolderArr: JSON.parse(localStorage.getItem('fixedFolderArr')) ? JSON.parse(localStorage.getItem('fixedFolderArr')) : [] // 固定文件夹
  },
  mutations: {
    setFixedFolderArr: (state, key) => {
      state.fixedFolderArr = key
    }
  },
  actions: {
    updateFixedFolderArr: ({
      commit
    }, key) => {
      commit('setFixedFolderArr', key)
    }
  }
}

export default fixedFolder