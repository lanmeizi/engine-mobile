// import baseConfig from '../../../static/config.json'
// import axios from 'axios'
// import iView from 'iview'
// const ajax = axios.create({ baseURL: baseConfig.apiBaseUrl })
// export function HttpPost(url, bodyJson) {
//   var options = {
//     method: 'POST',
//     uri: baseConfig.apiBaseUrl + url,
//     body: bodyJson,
//     json: true // Automatically stringifies the body to JSON
//   }
//   //var rp = require('request-promise');
//   iView.LoadingBar.start()
//   return new Promise((resolve, reject) => {
//     ajax({
//         url: url,
//         method: 'post',
//         headers: {
//           'content-type': 'application/json',
//           'xrd': '',
//           'xts': '',
//           'xguid': '',
//           'xsn': ''
//         },
//         data: options.body,
//         json: true
//       })
//       .then(function(response) {
//         //console.log(response)
//         resolve(response.data)
//         iView.LoadingBar.finish()
//       })
//       .catch(function(error) {
//         iView.LoadingBar.error()
//         reject(error);
//         console.log(error);
//       })
//       .finally(function() {
//         // always executed
//       });

//     // rp(options)
//     //   .then(function (resp) {
//     //     //console.log(resp)
//     //     resolve(resp)
//     //   }).catch(function (err) {
//     //     reject(err)
//     //   })
//   })
// }
