module.exports = {
   devServer: {
      // 前端请求的链接
      host: '192.168.8.35',
      // 前端请求的端口
      port: 3002,
      // 代理
      //  proxy: {
      //    '/video': {
      //      target: 'http://120.24.183.196:20205',
      //      changeOrigin: true,
      //      pathRewrite: {
      //        '^/video': ''
      //      }
      //    }
      //  }
  },
   publicPath:'./',
   lintOnSave:false
}