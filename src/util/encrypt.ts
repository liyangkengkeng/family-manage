const NodeRSA = require('node-rsa');

export const encrypt = (content: string, publicKey: string) => {
  const key = new NodeRSA(publicKey);
  return key.encrypt(content, 'base64');
};
