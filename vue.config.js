const { registerApi } = require('./server/apis/user.ts');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); //可以把session存放在mongodb数据库
const mongodb = require('./server/constant/index.ts');
const uri = mongodb.mongodbUrl;
const collection = mongodb.sessionCollection;
const databaseName = mongodb.databaseName;
const api = require('./server/apis/user.ts');
const mongoStore = new MongoDBStore({
  uri, //mongoDB connection string
  databaseName, //the MongoDB database to store sessions in
  collection, //the MongoDB collection to store sessions in
});

mongoStore.on('error', error => {
  console.log(error);
});

module.exports = {
  //修改入口文件，默认是main.js,现在改成main.ts
  publicPath: 'familyManage',
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
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '/familyManage/api': '/api' }
      }
    },  //后面的api加上了baseUrl，并且现在都在localhost:8080下面，所以可以不用代理
    port: 8080,
    historyApiFallback: {
      index: '/familyManage/',
    },
    //open: true, //打开浏览器
    before(app, server) {
      //多看看webpack 的 DevServer选项配置
      app.use(
        session({
          // 把session保存到数据库里面
          secret: 'family-manage', //加密字符串，随意写
          cookie: {
            maxAge: 1000 * 60 * 10, //设置有效时间10分钟
          },
          store: mongoStore,
          resave: true,
          saveUninitialized: true,
          rolling: true, //在每次请求时强行设置 cookie，这将重置cookie 过期时间（默认：false）
          //建议设置true ,设置过期时间如果是2分钟，如果在2分钟内一直操作（访问）浏览器页面，
          //最后一个访问结束后的2分钟在让过期
        })
      );
      registerApi(app); //把后端接口单独封装了     
    },
  },
};
