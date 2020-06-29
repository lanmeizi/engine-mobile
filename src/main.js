import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import Vant from 'vant'
import VueCookie from 'vue-cookie'
import 'vant/lib/index.css'
import * as cs from './assets/js/gb'
import * as req from '@/api/common'

import Bus from '@/utils/bus'
import 'vant/lib/index.less'
import '@/utils/rem.js'

import '@/styles/color.less' //引入换肤css

Vue.config.productionTip = false

// 路由地址跳转相同, 且没有捕获到错误，控制台始终会出现警告 （注：3.0以下版本则不会出现以下警告！！！，因路由回调问题…
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Vant)

Vue.use(VueCookie)

// 挂载全局
Vue.prototype.bus = Bus // 通信中间组件

// 将moment.js引入并放置在vue原型链上
import moment from 'moment'
Vue.prototype.moment = moment
// router.beforeEach((to, from, next) => {
//   let userId = store.state.user.userId
//   if (userId) {
//     next()
//   } else {
//     // if (to.path === '/index' || to.path === '/main') {
//     //   next()
//     // }
//     if (to.matched.length ===0) {  //如果未匹配到路由
//         from.name ? next({ name: from.name }) : next('/')
//     } else {
//         next()
//     }
//   }
// })

axios.get('./config.json').then((result) => {
    Vue.prototype.$baseConfig = result.data
    Vue.prototype.$http = req
    if (!Vue.prototype.$baseConfig.enableConsole) {
        cs.clog()
    }
    if(Vue.prototype.$baseConfig.mc){
        eruda.init()
    }
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount("#app")
}).catch((error) => {
    console.log('get baseConfig error...' + error)
})
