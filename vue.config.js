const modelUser = require('./server/schema.ts');
const URL = require("url"); //处理url的模块
const baseUrl = 'familyManage';

module.exports = {
  //修改入口文件，默认是main.js,现在改成main.ts
  publicPath: baseUrl,
  chainWebpack: config => {
    config
      .entry('app')
      .add('./src/main.ts')
      .end();
  },

  lintOnSave:false,

  devServer: {
    // proxy: {
    //   '/family-manage/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true,
    //     pathRewrite: { '/family-manage/api': '/api' }  
    //   }
    // },  //后面的api加上了baseUrl，并且现在都在localhost:8080下面，所以可以不用代理
    port: 8080,
    historyApiFallback: {
      index: '/familyManage/',   
    },
    //open: true, //打开浏览器
    before(app, server) { //多看看webpack 的 DevServer选项配置
      app.get(`/${baseUrl}/api/users/find`, (req, res) => {
        let userInfo = URL.parse(req.url, true).query || {};
        modelUser.find(userInfo, (err, doc) => { 
          if (err) console.log(err);
          else if (doc) res.send(JSON.stringify(doc));
        });
      });      
    }
  }
};
