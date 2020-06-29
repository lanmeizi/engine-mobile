/**
 * 多所有敏感字符进行encode，当参数中包含+:/;?&时，请使用encodeURIComponent方法对参数单独编码
 * @param {*} param
 */
export function urlParamEncode(param) {
  return encodeURIComponent(param)
}

/**
 * 对整个url编码，不会对下列字符进行编码 +:/;?& 它只会对汉语等特殊字符进行编码
 * @param {*} url
 */
export function urlEncode(url) {
  return encodeURI(url)
}
