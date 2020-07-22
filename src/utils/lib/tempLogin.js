import store from '../../store'
import * as $http from '@/api/common'
import VueCookie from 'vue-cookie'
// 临时登录
export default function templogin() {
  // console.log('执行临时等111', VueCookie.get('cookieObj'))
  $http.reqTempLogin().then(resp => {
    if (resp.rtncode === 1) {
      if (resp.rltcode === 1) {
        if (resp.usertype === 'temp' && sessionStorage.userId === undefined && VueCookie.get('cookieObj') === null) {
          console.log('resp临时登录6666666666666666666666688888888889999', resp)
          store.commit('user/setUserId', resp.userid)
          store.commit('user/setUserGuid', resp.userguid)
          store.commit('user/setRealName', resp.realname)
          store.commit('user/setToken', resp.token)
          store.commit('user/setMobileNum', resp.mobileNum)
          store.commit('user/setIsLogin', true)
          store.commit('user/setUserType', resp.usertype)
          store.commit('user/setPermission', resp.permission)

          sessionStorage.setItem('userguid', resp.userguid)
          sessionStorage.setItem('token', resp.token)
        }

        console.log('临时登录6666666666666666666666688888888889999==》store.state.user', store.state.user)

        reqGetLocation() // 获取定位
        reqGetIndustry() // 行业
        reqGetTaxes() // 税种
        reqGetInOut() // 进出口
        reqGetReduction() // 优惠项目
        reqGetReduction_tax() // 优惠税种
        reqGetReduction_industry() // 优惠行业
        reqGetCountry() // 获取国家
      }
    }
  })
}

// 获取定位
function reqGetLocation() {
  $http.ReqGetLocation().then(res => {
    console.log('定位', res)
    if (res.rtncode === 1) {
      if (res.rltcode === 1) { // 定位成功
        window.localStorage.setItem('valueProvCode', res.postion.provice)
        window.localStorage.setItem('valueP', res.postion.provicelabel)
        window.localStorage.setItem('valueCityCode', res.postion.city)
        window.localStorage.setItem('valueC', res.postion.citylabel)
      } else {
        window.localStorage.setItem('valueProvCode', '')
        window.localStorage.setItem('valueP', '')
        window.localStorage.setItem('valueCityCode', '')
        window.localStorage.setItem('valueC', '')
      }
    } else {
      window.localStorage.setItem('valueProvCode', '')
      window.localStorage.setItem('valueP', '')
      window.localStorage.setItem('valueCityCode', '')
      window.localStorage.setItem('valueC', '')
    }
  }).catch (() => {
    window.localStorage.setItem('valueProvCode', '')
    window.localStorage.setItem('valueP', '')
    window.localStorage.setItem('valueCityCode', '')
    window.localStorage.setItem('valueC', '')
  })
}
// 行业
function reqGetIndustry() {
  $http.reqGetIndustry().then(res => {
    if (res.rtncode === 1) {
      if (res.rltcode === 1) {
        store.dispatch('commonSearchData/updatereqGetIndustry', res.datas)
        localStorage.setItem('reqGetIndustry', JSON.stringify(res.datas))
      }
    }
  })
}
// 税种
function reqGetTaxes() {
  $http.reqGetTaxes().then(res => {
    if (res.rtncode === 1) {
      if (res.rltcode === 1) {
        store.dispatch('commonSearchData/updatereqGetTaxes', res.datas)
        localStorage.setItem('reqGetTaxes', JSON.stringify(res.datas))
      }
    }
  })
}
// 进出口
function reqGetInOut() {
  $http.reqGetInOut().then(res => {
    if (res.rtncode === 1) {
      if (res.rltcode === 1) {
        store.dispatch('commonSearchData/updatereqGetInOut', res.datas)
        localStorage.setItem('reqGetInOut', JSON.stringify(res.datas))
      }
    }
  })
}
// 优惠项目
function reqGetReduction() {
  $http.reqGetReduction().then(res => {
    if (res.rtncode === 1) {
      if (res.rltcode === 1) {
        store.dispatch('commonSearchData/updatereqGetReduction', res.datas)
        localStorage.setItem('reqGetReduction', JSON.stringify(res.datas))
      }
    }
  })
}
// 优惠税种
function reqGetReduction_tax() {
  $http.reqGetReduction_tax().then(res => {
    if (res.rtncode === 1) {
      if (res.rltcode === 1) {
        store.dispatch('commonSearchData/updatereqGetReduction_tax', res.datas)
        localStorage.setItem('reqGetReduction_tax', JSON.stringify(res.datas))
      }
    }
  })
}
// 优惠行业
function reqGetReduction_industry() {
  $http.reqGetReduction_industry().then(res => {
    if (res.rtncode === 1) {
      if (res.rltcode === 1) {
        store.dispatch('commonSearchData/updatereqGetReduction_industry', res.datas)
        localStorage.setItem('reqGetReduction_industry', JSON.stringify(res.datas))
      }
    }
  })
}
// 获取国家
function reqGetCountry() {
  $http.reqGetCountry().then(res => {
    if (res.rtncode === 1) {
      if (res.rltcode === 1) {
        store.dispatch('commonSearchData/updatereqGetCountry', res.datas)
        localStorage.setItem('reqGetCountry', JSON.stringify(res.datas))
      }
    }
  })
}
