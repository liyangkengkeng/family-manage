const routerBase = 'familyManage';
module.exports = {
  //修改入口文件，默认是main.js,现在改成main.ts
  publicPath: routerBase,
  chainWebpack: config => {
    config
      .entry('app')
      .add('./src/main.ts')
      .end();
  },

  lintOnSave: false,

  devServer: {
    proxy: {
      '/familyManage/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '/familyManage/api': '' }
      }
    },
    port: 8080,
    historyApiFallback: {
      index: '/familyManage/',
    },
    //open: true, //打开浏览器
    before(app, server) {
      //多看看webpack 的 DevServer选项配置 
    },
  },
};
