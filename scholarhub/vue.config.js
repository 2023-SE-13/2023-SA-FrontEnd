const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    // proxy:{
    //   '/api':{
    //     target:``,
    //     changeOrigin:true,
    //     pathRewrith:{
    //       '^/api':''
    //     }
    //   }
    // }
  }
})
