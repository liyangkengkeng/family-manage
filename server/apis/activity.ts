const Model = require('../schema.ts')

module.exports = {
  registerApi: app => {
    //增加活动
    app.post('/api/activity/add', (req, res) => {
      let data = '';  //心累，找了很久，axios.post发出来的请求，express这边获取参数的方法，
      req.on('data', chunk => { //试了很多都不可以，最后这种行 参考地址 https://www.cnblogs.com/dadouF4/p/10247071.html
        data += chunk;
      });
      req.on('end', () => {
        let activityInfo = JSON.parse(data);
        //如果存在活动名称，则告诉已经存在这个名称
        Model.ActivityModel.find({ activityName: activityInfo.activityName }, (err, doc) => {
          if (err) {
            console.log(err);
          } else if (doc) {
            if ((doc || []).length > 0) {
              //存在
              res.json({ code: -1, message: '活动名称已经存在，请换一个' });
            } else {
              //注册，保存到数据库
              Model.ActivityModel.create(activityInfo, (err, doc) => {
                if (err) {
                  console.log(err);
                  res.json({ code: -1, message: '新增失败' });
                }
                res.json({ code: 0, message: '新增成功' });
              });              
            }
          }
        });        
      })
    });

    //查询活动
    app.get('/api/activity/getList', (req, res) => {
      Model.ActivityModel.find({}, (err, doc) => {
        if (err) {
          res.json({ code: -1, message: '查询失败' });
        } else if (doc) {
          res.json({ code: 0, message: 'success', activityList: doc });
        }
      });
    });      
  },
};
