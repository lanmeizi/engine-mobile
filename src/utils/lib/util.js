// export default {
//   install(Vue, options) {
//     var lastTableHeader = []
//     Vue.prototype.setlastTableHeader = function(parameter) {
//         lastTableHeader = [parameter]
//         console.log("set:" + lastTableHeader)
//       },
//       Vue.prototype.getlastTableHeader = function() {
//         console.log("get:" + lastTableHeader)
//         return lastTableHeader;
//       }
//   },
// }

//encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
//unescape() 函数可对通过 escape() 编码的字符串进行解码,返回string 被解码后的一个副本。
//atob() 函数能够解码通过base-64编码的字符串数据。
//btoa() 函数能够从二进制数据“字符串”创建一个base-64编码的ASCII字符串。

export const base = {
  utf8_to_b64: function(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  },
  b64_to_utf8: function(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }
}

// export class mybase {
//  static utf8_to_b64(str) {
//     return window.btoa(unescape(encodeURIComponent(str)));
//   }
//  static b64_to_utf8(str) {
//     return decodeURIComponent(escape(window.atob(str)));
//   }
// }
