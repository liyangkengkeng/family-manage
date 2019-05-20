const fs = require('fs');
const path = require('path');
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
// key.setOptions({encryptionScheme: 'pkcs1'});
const privKeyPath = require('path').join(__dirname, './rsa_priv.pem');

module.exports = {
  // 生成公钥和私钥
  generateKey: () => {
    const publicDer = key.exportKey('pkcs1-public-pem');
    const privateDer = key.exportKey('pkcs1-private-pem');
    return {
      publicDer,
      privateDer,
    };
  },
  decrypt: (content) => {
    const filePath = path.join(__dirname, './rsa_priv.pem');
    let privateKey = filePath ? fs.readFileSync(filePath, 'utf-8') : ''; 
    key.importKey(privateKey);   
    if(!key.isPrivate()) {
      console.log('导入私钥失败！');
      return null;
    }
    return key.decrypt(content, 'utf-8');
  }
};
