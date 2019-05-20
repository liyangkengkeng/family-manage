const fs = require('fs');
const path = require('path');
const { generateKey } = require('../rsa/index.ts');

module.exports = {
  registerApi: app => {
    app.get('/api/users/generateRSAKey', (req, res) => {
      const {publicDer, privateDer} = generateKey();
      fs.writeFileSync(path.join(__dirname, '../rsa/rsa_priv.pem'), privateDer);
      // const filePath = path.join(__dirname, '../rsa/rsa_pub.pem');
      // let result = filePath ? fs.readFileSync(filePath, 'utf-8') : '';
      res.json({ code: 0, publicKey: publicDer });
    });
  }
}