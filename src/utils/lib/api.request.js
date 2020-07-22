import axios from 'axios'
import router from '@/router'
import {
    randomWord,
    getTimeStamp,
    getSign,
    getAeskey,
} from './sign.js'
import baseConfig from '../../../public/config.json'
import store from '../../store'
import TripleDES from './crypto.js'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import * as $http from '@/api/common'
// import templogin from '@/utils/lib/tempLogin.js'  // 临时登录
const reqUrl = baseConfig.realApiUrl

//连接2 api
const ajax = axios.create({
    baseURL: reqUrl,
    // withCredentials:true,
    timeout: 8000
})

ajax.interceptors.request.use(config => { // 请求拦截
    config.baseURL = Vue.prototype.$baseConfig.realApiUrl
    return config
}, function(error) {
    return Promise.reject(error);
})

ajax.interceptors.response.use(resp => { // 响应拦截
    if (resp.data.rtncode === -91 && resp.data.rltcode === -1) { // 登录过期
        clearData()
    } else if (resp.data.rtncode === -99 || resp.data.rltcode === -99) {
        clearData()
    } if (resp.data.rtncode === -50 && resp.data.rltcode === -1) { // 签名错误
        clearData()
    } else if (resp.data.rtncode === -98 || resp.data.rltcode === -98) {
        clearData()
    } else {
        return resp
    }
}, function(error) {
    return Promise.reject(error);
})

function clearData() {
    store.commit('user/setUserId', '')
    store.commit('user/setUserGuid', '')
    store.commit('user/setRealName', '')
    store.commit('user/setToken', '')
    store.commit('user/setMobileNum', '')
    store.commit('user/setIsLogin', true)
    store.commit('user/setUserType', '')
    store.commit('user/setPermission', '')

    store.commit('choose/setFlag1', false)
    store.commit('choose/setChooseUp1', '选择上传')
    store.commit('choose/setResult', [])

    sessionStorage.clear()
    VueCookie.delete('cookieObj')
    templogin()
    router.push('index')
}

function templogin() {
    $http.reqTempLogin().then(resp => {
      if (resp.rtncode === 1) {
        if (resp.rltcode === 1) {
          if (resp.usertype === 'temp' && sessionStorage.userId === undefined && VueCookie.get('cookieObj') === null) {
            console.log('resp临时登录', resp)
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
        }
      }
    })
}

function HttpGet(url, params) {
    console.log('HttpGet', url)
    var randomStr = randomWord(true, 10, 16)
    var timestamp = getTimeStamp()
    var token = store.state.user.token
    console.log('HttpGet getToken', token)
    var userGuid = store.state.user.userGuid
    var sign = getSign(timestamp, randomStr, token, "")
    var options = {
        uri: reqUrl + url,
        qs: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            // 'content-type': 'application/json',
            'xrd': randomStr,
            'xts': timestamp,
            'xguid': userGuid,
            'xsn': sign,
            'xen': url === '/api/public/cloud/uploaddir/getfixed' || url === '/api/public/cloud/uploaddir/getchild' || url.includes('/api/public/cloud/upload/onekey_speed_v2') ? true : false, //true=加密
            'xm': true
        },
        resolveWithFullResponse: true,
        json: true
    }

    return new Promise((resolve, reject) => {
        ajax({
                url: url,
                headers: options.headers,
                method: 'get',
                params: params,
                json: true
            })
            .then(function(response) {
                console.log('responseHttpGet', response)
                // if (response.config.headers.xen !== undefined && response.config.headers.xen === true) {
                if (response.config && (response.config.headers.xen !== undefined && response.config.headers.xen === true)) {
                    let aesKey = getAeskey(response.config.headers.xrd, store.state.user.token)
                    let data = TripleDES.decode(aesKey, response.data)
                    resolve(data)
                } else {
                    resolve(response.data)
                }
            })
            .catch(function(error) {
                reject(error);
            })
            .finally(function() {
                // always executed
            })
    })
}

function HttpPost(url, bodyJson, nodes) {
    console.log('HttpPost', url, bodyJson)
    var randomStr = randomWord(true, 10, 16)
    var timestamp = getTimeStamp()
    var token = store.state.user.token
    console.log('HttpPost POSTtoken', token)
    var userGuid = store.state.user.userGuid
    let aesKey = getAeskey(randomStr, store.state.user.token)
    let body
    if (nodes) {
        body = bodyJson
    } else {
        body = TripleDES.encode(aesKey, bodyJson)
    }
    var sign = getSign(timestamp, randomStr, token, JSON.stringify(bodyJson))
    var options = {
        method: 'post',
        uri: reqUrl + url,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'xrd': randomStr,
            'xts': timestamp,
            'xguid': userGuid,
            'xsn': sign,
            'xen': nodes?false:true,//true=加密
            'xm':true
        },
        body: body,
        resolveWithFullResponse: true,
        json: true // Automatically stringifies the body to JSON
    }
    // console.log('post data:')
    // console.log(options)
    return new Promise((resolve, reject) => {
        ajax({
                url: url,
                headers: options.headers,
                data: options.body,
                method: 'post',
                json: true
            })
            .then(function(response) {
                console.log('responseHttpPost', response)
                if (response.data.rltcode || response.data.rtncode) {
                    resolve(response.data)
                } else if (response.config.headers.xen !== undefined && response.config.headers.xen === true) {
                    let aesKey = getAeskey(response.config.headers.xrd, store.state.user.token)
                    let data = TripleDES.decode(aesKey, response.data)
                    resolve(data)
                } else {
                    resolve(response.data)
                }
            })
            .catch(function(error) {
                reject(error);
            })
            .finally(function() {
                // always executed
            })
    })
}

function HttpPost2(url, bodyJson) {
    var options = {
        method: 'POST',
        body: bodyJson,
        json: true // Automatically stringifies the body to JSON
    }
    return new Promise((resolve, reject) => {
        ajax({
                url: url,
                method: 'post',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'xrd': '',
                    'xts': '',
                    'xguid': '',
                    'xsn': '',
                    'xm':true
                },
                data: options.body,
                json: true
            })
            .then(function(response) {
                console.log('HttpPost2 response', response)
                resolve(response.data)
            })
            .catch(function(error) {
                reject(error);
            })
            .finally(function() {
                // always executed
            });
    })
}

export {
    HttpGet,
    HttpPost,
    HttpPost2
}
