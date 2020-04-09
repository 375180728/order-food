module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://120.26.173.224:8080/order-1.0-SNAPSHOT',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      },
    }
  }
}