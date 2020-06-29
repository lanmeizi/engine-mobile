const commonSearchData = {
  namespaced: true,
  state: {
    reqGetIndustry: JSON.parse(localStorage.getItem('reqGetIndustry')) ? JSON.parse(localStorage.getItem('reqGetIndustry')) : [], // 行业
    reqGetTaxes: JSON.parse(localStorage.getItem('reqGetTaxes')) ? JSON.parse(localStorage.getItem('reqGetTaxes')) : [], // 税种
    reqGetInOut: JSON.parse(localStorage.getItem('reqGetInOut')) ? JSON.parse(localStorage.getItem('reqGetInOut')) : [], // 进出口
    reqGetReduction: JSON.parse(localStorage.getItem('reqGetReduction')) ? JSON.parse(localStorage.getItem('reqGetReduction')) : [], // 优惠项目
    reqGetReduction_tax: JSON.parse(localStorage.getItem('reqGetReduction_tax')) ? JSON.parse(localStorage.getItem('reqGetReduction_tax')) : [], // 优惠税种
    reqGetReduction_industry: JSON.parse(localStorage.getItem('reqGetReduction_industry')) ? JSON.parse(localStorage.getItem('reqGetReduction_industry')) : [], // 优惠行业
    reqGetCountry: JSON.parse(localStorage.getItem('reqGetCountry')) ? JSON.parse(localStorage.getItem('reqGetCountry')) : [], // 获取国家
    provinceAndCity: [], // 获取省市
    activeName: 'a', // tab菜单
    activePlace: 0, // 城市 省份 全国列表的切换
    valueP: localStorage.getItem('valueP') ? localStorage.getItem('valueP') : '',
    valueC: localStorage.getItem('valueC') ? localStorage.getItem('valueC') : '',
    valueProvCode: localStorage.getItem('valueProvCode') ? localStorage.getItem('valueProvCode') : '',
    valueCityCode: localStorage.getItem('valueCityCode') ? localStorage.getItem('valueCityCode') : '',
    active: 0 // 通用规定和专属规定
  },
  mutations: {
    reqGetIndustry: (state, key) => {
      state.reqGetIndustry = key
    },
    reqGetTaxes: (state, key) => {
      state.reqGetTaxes = key
    },
    reqGetInOut: (state, key) => {
      state.reqGetInOut = key
    },
    reqGetReduction: (state, key) => {
      state.reqGetReduction = key
    },
    reqGetReduction_tax: (state, key) => {
      state.reqGetReduction_tax = key
    },
    reqGetReduction_industry: (state, key) => {
      state.reqGetReduction_industry = key
    },
    reqGetCountry: (state, key) => {
      state.reqGetCountry = key
    },
    reqProvinceAndCity: (state, key) => {
      state.provinceAndCity = key
    },
    changeActiveName: (state, key) => {
      state.activeName = key
    },
    changeActivePlace: (state, key) => {
      state.activePlace = key
    },
    changeActive: (state, key) => {
      state.active = key
    },
    // 法规层级的数据
    changeValueP: (state, key) => {
      state.valueP = key
    },
    changeValueC: (state, key) => {
      state.valueC = key
    },
    changeValueProvCode: (state, key) => {
      state.valueProvCode = key
    },
    changeValueCityCode: (state, key) => {
      state.valueCityCode = key
    },
  },
  actions: {
    updatereqGetIndustry: ({
      commit
    }, key) => {
      commit('reqGetIndustry', key)
    },
    updatereqGetTaxes: ({
      commit
    }, key) => {
      commit('reqGetTaxes', key)
    },
    updatereqGetInOut: ({
      commit
    }, key) => {
      commit('reqGetInOut', key)
    },
    updatereqGetReduction: ({
      commit
    }, key) => {
      commit('reqGetReduction', key)
    },
    updatereqGetReduction_tax: ({
      commit
    }, key) => {
      commit('reqGetReduction_tax', key)
    },
    updatereqGetReduction_industry: ({
      commit
    }, key) => {
      commit('reqGetReduction_industry', key)
    },
    updatereqGetCountry: ({
      commit
    }, key) => {
      commit('reqGetCountry', key)
    },
    updateProvinceAndCity: ({
      commit
    }, key) => {
      commit('reqProvinceAndCity', key)
    }
  }
}

export default commonSearchData
