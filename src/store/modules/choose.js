const choose = {
  namespaced: true,
  state: {
    flag1: false,
    chooseUp1: '选择上传',
    flag2: false,
    chooseUp2: '选择上传',
    flag3: false,
    delWord: '选择删除',
    lists: [],
    result: [],
    commonResult: [], // 通用
    industryResult: [] // 专属
  },
  mutations: {
    setDelWord: (state, key) => {
      state.delWord = key
    },
    setChooseUp1: (state, key) => {
      state.chooseUp1 = key
    },
    setChooseUp2: (state, key) => {
      state.chooseUp2 = key
    },
    setFlag1: (state, key) => {
      state.flag1 = key
    },
    setFlag2: (state, key) => {
      state.flag2 = key
    },
    setFlag3: (state, key) => {
      state.flag3 = key
    },
    setLists: (state, key) => {
      state.lists = key
    },
    // 选中的doc
    setResult: (state, key) => {
      state.result = key
    },
    setCommonResult: (state, key) => {
      state.commonResult = key
    },
    setIndustryResult: (state, key) => {
      state.industryResult = key
    },
  },
  actions: {
    updateLists: ({
      commit
    }, key) => {
      commit('setLists', key)
    },
    updateCommonResult: ({
      commit
    }, key) => {
      commit('setCommonResult', key)
    },
    updateIndustryResult: ({
      commit
    }, key) => {
      commit('setIndustryResult', key)
    }
  }
}

export default choose
