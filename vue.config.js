module.exports = {
  //修改入口文件，默认是main.js,现在改成main.ts
  chainWebpack: config => {
    config
      .entry('app')
      .add('./src/main.ts')
      .end();
  },
};
