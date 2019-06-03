const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongodb = require('./server/constant/index.ts');
const uri = mongodb.mongodbUrl;
const collection = mongodb.sessionCollection;
const databaseName = mongodb.databaseName;
const mongoStore = new MongoDBStore({
  uri, //mongoDB connection string
  databaseName, //the MongoDB database to store sessions in
  collection, //the MongoDB collection to store sessions in
});

const app = express();

app.use(
  session({
    // 把session保存到数据库里面
    secret: 'family-manage', //加密字符串，随意写
    cookie: {
      maxAge: 1000 * 60 * 10, //设置有效时间10分钟
    },
    store: mongoStore,
    resave: false,
    saveUninitialized: false,
    rolling: true, //在每次请求时强行设置 cookie，这将重置cookie 过期时间（默认：false）
    //建议设置true ,设置过期时间如果是2分钟，如果在2分钟内一直操作（访问）浏览器页面，
    //最后一个访问结束后的2分钟在让过期
  })
);
app.use((req,res,next) => {
  next()
});

require('./server/apis/user.ts').registerApi(app);
require('./server/apis/rsa.ts').registerApi(app);
require('./server/apis/activity.ts').registerApi(app);

app.listen(3000, () => console.log('app listening on port 3000'));
