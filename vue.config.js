module.exports = {
  //修改入口文件，默认是main.js,现在改成main.ts
  chainWebpack: config => {
    config
      .entry('app')
      .add('./src/main.ts')
      .end();
  },

  lintOnSave:false,

  devServer: {
    proxy: {
      '/family-manage/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '/family-manage/api': '/api' }  
      }
    }
  }
};
