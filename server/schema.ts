const mongodb = require ("./constant/index.ts");

const mongoose = require("mongoose");
//本地users数据库
const mongoURL = mongodb.mongoURL;
//连接users数据库
mongoose.connect(mongoURL)

const db = mongoose.connection;

//成功和失败回调

db.on('error', console.error.bind(console, 'Connection errro'));
db.once('open', () => {
  //connected!
  console.log('connect success')
})


//定义Schema(每个schema会映射到mongodb中的一个collection)
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: String,
  password: String,
  description: String,
});


const UsersModel = mongoose.model(mongodb.collection, usersSchema);

 module.exports = UsersModel