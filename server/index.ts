const Models = require("./schema.ts");
module.exports = {
  getUsersList(apiRoutes){
    apiRoutes.get('/api/users/find', (req, res) => {
      console.log(11, req)
      Models.find({}, (err, doc) => {
        if (err) console.log(err);
        else if (doc) res.send(JSON.stringify(doc));
      })
    });
  }
}