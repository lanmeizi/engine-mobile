import axios from 'axios'
import {
  randomWord,
  getTimeStamp,
  getSign,
  tempLoginSign,
  getAeskey,
} from './sign.js'
import baseConfig from '../../../static/config.json'
import store from '../../store'
import TripleDES from './crypto.js'
import { Base64 } from 'js-base64'
import eventBus from '../../components/common/event_bus.js'
import iView from 'view-design'
const ajax = axios.create({ baseURL: baseConfig.apiBaseUrl })

function HttpDownLoad(url, body, method, f, msg) {
  //console.log("url:"+url,"\nmethod:"+method)
  var client = new XMLHttpRequest();
  var randomStr = randomWord(true, 10, 16)
  var timestamp = getTimeStamp()
  var token = store.state.user.token
  var userGuid = store.state.user.userGuid
  console.log(
    "url:" + url,
    "\nmethod:" + method,
    "\ntoken:" + token,
    "\nrandomStr:" + randomStr,
    "\ntimestamp:" + timestamp,
    "\nbody:" + JSON.stringify(body))

  var sign = getSign(timestamp, randomStr, token, method === "get" ? "" : JSON.stringify(body))
  var options = {
    uri: baseConfig.apiBaseUrl + url
  }
  client.open(method, options.uri);
  client.responseType = 'blob'
  client.setRequestHeader('xrd', randomStr);
  client.setRequestHeader('xts', timestamp);
  client.setRequestHeader('xguid', userGuid);
  client.setRequestHeader('xsn', sign);
  client.setRequestHeader('xen', true) //true需要加密


  client.onreadystatechange = function() {
    if (client.readyState === 4 && client.status === 200) {
      // console.log("开始下载...")
      // console.log(client)
      var name = client.getResponseHeader("Content-Language");
      var filename = decodeURIComponent(name); //name.substring(20, name.length);
      if (filename === undefined ||
        filename === null ||
        filename === "null" ||
        filename === "fail" ||
        filename === "") {
        var blob = new Blob([client.response], { type: 'plain/text', endings: 'native' });
        var reader = new FileReader();
        reader.readAsText(blob);
        reader.onload = function(e) {
          var rData = JSON.parse(this.result)
          console.log(rData)
          if (rData.rtncode === -99) {
            //login
            //store.commit("setLoginForm", true)
            eventBus.$emit("user-login", "true") //临时登录
          } else if (rData.rltcode === -250) {
            msg(rData.rltdesc)
            f()
          } else {
            if (f !== undefined) {
              f() //回调关闭弹窗
            }
            if (msg !== undefined) {
              msg("下载失败")
            }
          }
        }
      } else {
        var blob = new Blob([client.response], { type: 'application/octet-stream' });
        var csvUrl = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = csvUrl;
        link.download = filename;
        link.click();
        if (f !== undefined) {
          f() //回调关闭弹窗
        }
      }


    } else if (client.readyState === 4 && client.status !== 200) {
      if (f !== undefined) {
        f() //回调关闭弹窗
      }
      if (msg !== undefined) {
        msg("下载失败")
      }
    } else {
      // console.log("client.readyState:" + client.readyState)
      // console.log("client.status:" + client.status)
    }
  };
  try {
    if (method === "get") {
      client.send();
    } else if (method === "post") {
      let aesKey = getAeskey(randomStr, store.state.user.token)
      let bodyEncrypt = TripleDES.encode(aesKey, body)
      client.send(JSON.stringify(bodyEncrypt));
    }
  } catch (e) {
    console.log(e)
  }


}


function HttpGet(url, params) {
  var randomStr = randomWord(true, 10, 16)
  var timestamp = getTimeStamp()
  var token = store.state.user.token
  var userGuid = store.state.user.userGuid
  var sign = getSign(timestamp, randomStr, token, "")
  //console.log("u:"+userId)
  var options = {
    uri: baseConfig.apiBaseUrl + url,
    qs: params,
    headers: {
      'content-type': 'application/json',
      'xrd': randomStr,
      'xts': timestamp,
      //'x-user': userId,
      'xguid': userGuid,
      'xsn': sign
    },
    resolveWithFullResponse: true,
    json: true // Automatically parses the JSON string in the response
  }
  iView.LoadingBar.start()
  // var rp = require('request-promise');
  //console.log(options.headers)
  return new Promise((resolve, reject) => {
    ajax({
        url: url,
        headers: options.headers,
        method: 'get',
        params:params,
        json: true
      })
      .then(function(response) {
        //console.log(response)
        if (response.headers.xen !== undefined && response.headers.xen === "true") {
          let aesKey = getAeskey(response.headers.xrd, store.state.user.token)
          let data = TripleDES.decode(aesKey, response.data)
          // console.log('get.response->')
          // console.log(data)
          resolve(data)
        } else {
          resolve(response.data)
        }
        iView.LoadingBar.finish()
      })
      .catch(function(error) {
        iView.LoadingBar.error()
        reject(error);
        console.log(error);
      })
      .finally(function() {
        // always executed
      });


  })
  // return rp(options)
}

function HttpPost(url, bodyJson) {
  //

  var randomStr = randomWord(true, 10, 16)
  var timestamp = getTimeStamp()
  var token = store.state.user.token
  var userGuid = store.state.user.userGuid
  let aesKey = getAeskey(randomStr, store.state.user.token)
  let body = TripleDES.encode(aesKey, bodyJson)
  var sign = getSign(timestamp, randomStr, token, JSON.stringify(bodyJson))
  //console.log("key:"+aesKey)
  // console.log("userId:"+userId)
  var options = {
    method: 'post',
    uri: baseConfig.apiBaseUrl + url,
    headers: {
      'content-type': 'application/json',
      'xrd': randomStr,
      'xts': timestamp,
      //'x-user': userId,
      'xguid': userGuid,
      'xsn': sign,
      'xen': true,
    },
    body: body,
    resolveWithFullResponse: true,
    json: true // Automatically stringifies the body to JSON
  }
  //var rp = require('request-promise');
  //return rp(options)
  iView.LoadingBar.start()
  return new Promise((resolve, reject) => {
    ajax({
        url: url,
        headers: options.headers,
        data: options.body,
        method: 'post',
        json: true
      })
      .then(function(response) {
        //console.log(response)
        if (response.headers.xen !== undefined && response.headers.xen === "true") {
          let aesKey = getAeskey(response.headers.xrd, store.state.user.token)
          let data = TripleDES.decode(aesKey, response.data)
          resolve(data)
        } else {
          resolve(response.data)
        }
        iView.LoadingBar.finish()
      })
      .catch(function(error) {
        iView.LoadingBar.error()
        reject(error);
        console.log(error);
      })
      .finally(function() {
        // always executed
      });

  })
}


function TempUserlogin() {
  //export const reqTempLogin = function () {
  var randomStr
  var timestamp
  var sign
  var password
  randomStr = randomWord(true, 10, 16)
  timestamp = getTimeStamp()
  password = baseConfig.tempLoginPwd
  sign = tempLoginSign(timestamp, randomStr, password)
  var bodyJson = {
    randstr: randomStr,
    timestamp: timestamp,
    sign: sign
  }
  var options = {
    method: 'POST',
    uri: baseConfig.apiBaseUrl + "/api/public/login/tempuser",
    body: bodyJson,
    json: true // Automatically stringifies the body to JSON
  }
  //var rp = require('request-promise');
  return new Promise((resolve, reject) => {
    ajax({
      url: options.uri,
      headers: {
        'content-type': 'application/json',
        'xrd': randomStr,
        'xts': timestamp,
        'xguid': '',
        'xsn': sign,
        'xen': true,
      },
      method: 'post',
      data:options.body,
      json:true
    })
    .then(function(response){
      resolve(response.data)
    })
    .catch(function(error){
      reject(error)
    })
  })
}


function WebPost(url, bodyJson) {
  return new Promise((resolve, reject) => {
    var token = store.state.user.token
    if (token == "" || token == undefined || token == null) {
      return TempUserlogin().then(res => {
        console.log("token失效,重登录成功,开始执行请求...")
        setTempLoginState(res)
        return HttpPost(url, bodyJson)
          .then(function(resp) {
            resolve(resp)
          }).catch(function(err) {
            console.log("err:" + err)
            reject(err)
          })
      }).catch(err => {
        console.log("token失效,重登录失败,原因:" + err)
        reject(err)
      })
    } else {
      return HttpPost(url, bodyJson)
        .then(function(resp) {
          return dispatchResponse(resp, url, bodyJson, 'post').then(function(rsp) {
            resolve(rsp)
          }).catch(function(err) {
            reject(err)
          })
        }).catch(function(err) {
          reject(err)
        })
    }

  })
}


function WebGet(url, params) {
    var token = store.state.user.token
    if (token == "" || token == undefined || token == null) {
       TempUserlogin().then(res => {
        console.log("token失效,重登录成功,开始执行请求...")
        console.log(res)
        setTempLoginState(res)
        return HttpGet(url, params)  
      }).catch(err => {
        console.log("token失效,重登录失败,原因:" + err)
      })
    } 
    // else {
    //   return HttpGet(url, params)
    //     .then(function(resp) {
    //       return dispatchResponse(resp, url, params, 'get').then(function(rsp) {
    //           resolve(rsp);
    //         })
    //         .catch(function(err) {
    //           reject(err);
    //         })
    //     }).catch(function(err) {
    //       reject(err);
    //     })
    // }
}

function dispatchResponse(resp, url, params, method) {
  return new Promise((resolve, reject) => {
    //console.log(resp)
    if (resp.rtncode === 1 && resp.rltcode === 1) {
      resolve(resp);
    } else if (resp.rtncode === -99 || resp.rltcode === -99) {
      //store.commit("setLoginForm", true)
      eventBus.$emit("user-login", "true") //临时登录
      //denglu
      resolve(resp);
    } else if (resp.rtncode === -98 || resp.rltcode === -98) {
      //tmplogin
      //token失效,清空session缓存
      
      return TempUserlogin().then(res => {
        console.log("temptoken失效,临时用户登录成功...")
        eventBus.$emit("user-logoff", "true") //注销用户,刷新ui
        //store.commit("setLoginForm", false)//清除登录状态模式框和ui
        setTempLoginState(res)

        if (method === 'get') {
          return HttpGet(url, params)
            .then(function(resp) {
              resolve(resp)
            }).catch(function(err) {
              reject(err)
            })
        } else if (method === 'post') {
          // console.log("重发post请求,url:" + url + "params:" + params)
          return HttpPost(url, params)
            .then(function(rsp) {
              resolve(rsp)
            }).catch(function(err) {
              reject(err)
            })
        }

      }).catch(err => {
        // console.log("token失效,重登录失败,原因:" + err)
        reject(err);
      })
      //resolve(resp)
    } else {
      resolve(resp);
    }
  })
}


function setTempLoginState(resp) {
  //console.log(resp);
  store.commit('setUserId', resp.userid)
  store.commit('setUserGuid', resp.userguid)
  store.commit('setRealName', '访客')
  store.commit('setToken', resp.token)
  store.commit('setIsLogin', true)
}

export {
  WebPost,
  WebGet,
  test,
  HttpDownLoad,
  PostDownLoad,
}
