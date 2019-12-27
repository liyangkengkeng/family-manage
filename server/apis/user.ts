const router = require('express').Router();
const { UsersModel } = require('../schema.ts')
const URLUtil = require('url'); //处理url的模块
const { decrypt } = require('../rsa/index.ts');

router.get('/find', (req, res) => {
  const userInfo = URLUtil.parse(req.url, true).query || {};
  const originPassword = decrypt(userInfo.password);
  userInfo.password = originPassword;
  UsersModel.find(userInfo, (err, doc) => {
    if (err) {
      res.json({ code: -1, message: '登录失败' });
    } else if (doc) {
      if ((doc || []).length > 0) {
        req.session.user = doc[0].name;
        req.session.islogin = true;
        //res.json({ code: 0, message: '登录成功', userList: doc });
        res.json({ code: 0, message: '登录成功'});
        return;
      }
      res.json({ code: -2, message: '账号或密码错误' });
    }
  });
});

//退出登录的时候，需要清除session
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({ code: 0 });
});
//注册
router.post('/register', (req, res) => {
  let data = '';  //心累，找了很久，axios.post发出来的请求，express这边获取参数的方法，
  req.on('data', chunk => { //试了很多都不可以，最后这种行 参考地址 https://www.cnblogs.com/dadouF4/p/10247071.html
    data += chunk;
  });
  req.on('end', () => {
    let userInfo = JSON.parse(data);
    //先用账号查询，如果存在账号，则告诉已经注册，不存在则注册
    UsersModel.find({ name: userInfo.name }, (err, doc) => {
      if (err) {
        console.log(err);
      } else if (doc) {
        if ((doc || []).length > 0) {
          //存在
          res.json({ code: -1, message: '账号存在' });
        } else {
          //注册，保存到数据库
          const originPassword = decrypt(userInfo.password);
          userInfo.password = originPassword;
          UsersModel.create(userInfo, (err, doc) => {
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

router.get('/check', (req, res, next) => {
  const session = req.session;
  if(session.user && session.islogin) {
    res.json({ code: 0, message: '已经登录过了' });
  } else {
    res.json({ code: 401, message: '未登录' });
  }
  
});

module.exports = router;
