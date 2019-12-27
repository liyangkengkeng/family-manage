const fs = require('fs');
const path = require('path');
const { generateKey } = require('../rsa/index.ts');

module.exports = {
  registerApi: app => {
    app.get('/users/generateRSAKey', (req, res) => {
      const {publicDer, privateDer} = generateKey();
      fs.writeFileSync(path.join(__dirname, '../rsa/rsa_priv.pem'), privateDer);
      res.json({ code: 0, publicKey: publicDer });
    });
  }
}