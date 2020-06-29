import VueCookie from 'vue-cookie'
import TripleDES from '@/utils/lib/crypto.js'
const cookieObj = VueCookie.get('cookieObj') !== null ? TripleDES.decode('token', JSON.parse(VueCookie.get('cookieObj'))) : null

const user = {
  namespaced: true,
  state: {
    userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : (VueCookie.get('cookieObj') !== null ? cookieObj.userId : ''),
    userGuid: sessionStorage.getItem('userguid') ? sessionStorage.getItem('userguid') : (VueCookie.get('cookieObj') !== null ? cookieObj.userguid : ''), //临时用户生成一个随机的GUID，固定IP的企业用户从未使用的用户中找一个
    realName: '',
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : (VueCookie.get('cookieObj') !== null ? cookieObj.token : ''),
    mobileNum: sessionStorage.getItem('phone') ? sessionStorage.getItem('phone') : (VueCookie.get('cookieObj') !== null ? cookieObj.phone : ''),
    setIsLogin: true,
    usertype: '',
    permission: [],
    Owx: ''

    // userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : (VueCookie.get('cookieObj') !== null ? JSON.parse(VueCookie.get('cookieObj')).userId : ''),
    // userGuid: sessionStorage.getItem('userguid') ? sessionStorage.getItem('userguid') : (VueCookie.get('cookieObj') !== null ? JSON.parse(VueCookie.get('cookieObj')).userguid : ''), //临时用户生成一个随机的GUID，固定IP的企业用户从未使用的用户中找一个
    // realName: '',
    // token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : (VueCookie.get('cookieObj') !== null ? JSON.parse(VueCookie.get('cookieObj')).token : ''),
    // mobileNum: sessionStorage.getItem('phone') ? sessionStorage.getItem('phone') : (VueCookie.get('cookieObj') !== null ? JSON.parse(VueCookie.get('cookieObj')).phone : ''),
    // setIsLogin: true,
    // usertype: '',
    // permission: [],
    // Owx: ''
  },
  mutations: {
    setUserId: (state, key) => {
      state.userId = key
    },
    setUserGuid: (state, key) => {
      state.userGuid = key
    },
    setRealName: (state, key) => {
      state.realName = key
    },
    setToken: (state, key) => {
      state.token = key
    },
    setMobileNum: (state, key) => {
      state.mobileNum = key
    },
    setUserLogout: () => {
      // state.userId = key
    },
    setIsLogin: (state, key) => {
      state.setIsLogin = key
    },
    setUserType: (state, key) => {
      state.usertype = key
    },
    setPermission: (state, key) => {
      state.permission = key
    },
    setOwx: (state, key) => {
      console.log('判断是微信浏览器还是浏览器', key)
      state.Owx = key
    }
  }
}

export default user
