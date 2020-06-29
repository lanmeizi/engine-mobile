import axios from 'axios'
import { randomWord, getTimeStamp, getAeskey} from './round'
import md5 from 'js-md5'
import tripleDES from './crypto'
import { options } from './baseData'

import { Toast } from 'vant'
import 'vant/lib/index.css'

const http = axios.create({
  baseURL: options.baseURL,
  timeout: 5000,
  header: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

http.interceptors.response.use(response => {
  if (response.data.rtncode) {
    Toast.fail({
      duration: 5000,
      message: `错误提示信息：${response.data.rtndesc}`,
    })
  }
  return response
}, error => {
  console.log(error)
  return Promise.reject(error)
})

export const postRequest = (url, data = {}) => {
  let randomStr = randomWord(true, 10, 16)
  let timestamp = getTimeStamp()
  let strBody = JSON.stringify(data)
  let md5Str = `appid=${options.xappid}&pwd=${options.password}&randstr=${randomStr}&timestamp=${timestamp}&body=${strBody}`
  let key = getAeskey(`${randomStr}`, `${options.password}`)
  let body = tripleDES.encode(key, data)
  return new Promise((resolve, reject) => {
    http({
      url: url,
      method: 'post',
      data: body,
      headers: {
        'xappid': options.xappid,
        'xrd': randomStr, // 随机数
        'xsn': md5(md5Str), // 加签
        'xts': timestamp, // 时间戳
        'xen': 'true'
      }
    }).then(response => {
      if (response.headers.xen !== undefined && response.headers.xen === "true") {
        let key = getAeskey(`${response.headers.xrd}`, options.password)
        let data = tripleDES.decode(key, response.data)
        resolve(data)
      } else {
        resolve(response.data)
      }
    }).catch(error => {
      console.log(error)
      reject(error)
    })
  })
}

export const getRequest = (url, params = {}) => {
  let randomStr = randomWord(true, 10, 16)
  let timestamp = getTimeStamp()
  let md5Str = `appid=${options.xappid}&pwd=${options.password}&randstr=${randomStr}&timestamp=${timestamp}&body=`
  return new Promise((resolve, reject) => {
    http({
      url: url,
      method: 'get',
      params: params,
      headers: {
        'xappid': options.xappid,
        'xrd': randomStr, // 随机数
        'xsn': md5(md5Str), // 加签
        'xts': timestamp, // 时间戳
        'xen': 'true'
      }
    }).then(response => {
      if (response.headers.xen !== undefined && response.headers.xen === "true") {
        let key = getAeskey(`${response.headers.xrd}`, options.password)
        let data = tripleDES.decode(key, response.data)
        resolve(data)
      } else {
        resolve(response.data)
      }
    }).catch(error => {
      console.log(error)
      reject(error)
    })
  })
}
