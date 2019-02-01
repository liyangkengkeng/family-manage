// const UsersModel = require('../schema/userSchema.ts');
// const SessionModel = require('../schema/sessionSchema.ts');
const Model = require('../schema.ts')
const URLUtil = require('url'); //处理url的模块

console.log(Model)

module.exports = {
  registerApi: app => {
    app.get('/api/users/find', (req, res) => {
      let userInfo = URLUtil.parse(req.url, true).query || {};
      Model.UsersModel.find(userInfo, (err, doc) => {
        if (err) {
          res.json({ code: -1, message: '登录失败' });
        } else if (doc) {
          if ((doc || []).length > 0) {
            req.session.user = doc[0].name;
            res.json({ code: 0, message: '登录成功', userList: doc });
            return;
          }
          res.json({ code: -2, message: '此账号不存在' });
        }
      });
    });

    app.get('/api/users/isLogin', (req,res) => {
      Model.SessionModel.find({}, (err, doc) => {
        if (err) {
          res.json({ code: -1, message: 'error' });
        } else if (doc) {
          console.log('11', JSON.stringify(doc) )
          res.json({ code: 0, message: 'success' });
        }
      });      
    });

    //退出登录的时候，需要清除session
    app.get('/api/users/logout', (req, res) => {
      req.session.user = null;
      res.json({ code: 0 });
    });
    //注册
    app.post('/api/users/register', (req, res) => {
      let data = '';  //心累，找了很久，axios.post发出来的请求，express这边获取参数的方法，
      req.on('data', chunk => { //试了很多都不可以，最后这种行 参考地址 https://www.cnblogs.com/dadouF4/p/10247071.html
        data += chunk;
      });
      req.on('end', () => {
        let userInfo = JSON.parse(data);
        //先用账号查询，如果存在账号，则告诉已经注册，不存在则注册
        Model.UsersModel.find({ name: userInfo.name }, (err, doc) => {
          if (err) {
            console.log(err);
          } else if (doc) {
            if ((doc || []).length > 0) {
              //存在
              res.json({ code: -1, message: '账号存在' });
            } else {
              //注册，保存到数据库
              Model.UsersModel.create(userInfo, (err, doc) => {
                if (err) {
                  console.log(err);
                  res.json({ code: -1, message: '注册失败' });
                }
                res.json({ code: 0, message: '注册成功' });
              });              
            }
          }
        });        
      })
      

    });    
  },
};
