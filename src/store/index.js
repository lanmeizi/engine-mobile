import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/index'
import search from './modules/search'
import choose from './modules/choose'
import changeVersion from './modules/changeVersion'
import fixedFolder from './modules/fixedFolder'
import commonSearchData from './modules/commonSearchData'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    search,
    choose,
    changeVersion,
    commonSearchData,
    fixedFolder
  },
  getters
})

export default store
