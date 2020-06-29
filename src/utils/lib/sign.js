/*
生成6—12位随机字符串,randomWord(true,6,12)
生成随机的6位字符串,randomWord(false,6)
*/
import md5 from 'js-md5'

export function randomWord(randomFlag, min, max) {
  var str = ''
  var range = min
  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    // ,
    // '-', '.', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', ':', '<', '>', '?'
  ]

  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min // 任意长度
  }
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

// 获取当前时间戳，毫秒
export function getTimeStamp() {
  return (new Date()).valueOf().toString()
  // return new Date().getTime();
}
export function getSign(timestamp, randStr, token,body) {
  var oriStr = ''
  oriStr += 'randstr=' + randStr
  oriStr += '&timestamp=' + timestamp
  oriStr += '&token=' + token
  oriStr += '&body=' + body
  // console.log(oriStr)
  return md5(oriStr)
}

export function loginSign(userId, timestamp, randStr, password) {
  let oriStr = ''
  oriStr += 'userid=' + userId
  oriStr += '&password=' + md5(userId + password).toLocaleLowerCase()
  oriStr += '&randstr=' + randStr
  oriStr += '&timestamp=' + timestamp
  return md5(oriStr)
}

export function tempLoginSign(timestamp, randStr, publicPassword) {
  let oriStr = ''
  oriStr += 'password=' + md5(publicPassword).toLocaleLowerCase()
  oriStr += '&randstr=' + randStr
  oriStr += '&timestamp=' + timestamp
  return md5(oriStr)
}

export function getAeskey(passKey, token) {
  //24位
  if (token === undefined || token === "") { return passKey }
  while (passKey.length < 24) {
    passKey += token
  }
  return passKey.substr(0, 24)
}

//公众号取key
// export function getAeskey2(xrd, pwd) {
//   //24位
//   if (pwd === undefined || pwd === "") { return xrd }
//   while (xrd.length < 24) {
//     xrd += pwd
//   }
//   return xrd.substr(0, 24)
// }


// export function publicSign(timestamp, randStr) {
//   let oriStr = ''
//   oriStr += 'randstr=' + randStr
//   oriStr += '&timestamp=' + timestamp
//   return md5(oriStr)
// }
