// 引入node原生的几个模块
const fs = require('fs') // 文件操作
const path = require('path') // 路径操作
const crypto = require('crypto') // 加密相关
/**
 * 使用私钥解密传入的内容
 * @param {string} encryptedInfo 传入的内容（被公钥加密了的）
 * @returns 
 */
module.exports = function(encryptedInfo) {
  // 以UTF-8格式读取私钥(../public/rsa_private_key.pem)中的内容
  const privateKey = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem'), 'utf-8')

  // 将传入的内容进行base64编码
  let buffer2 = Buffer.from(encryptedInfo, 'base64')
  // 使用私钥解密传入的内容
  let decrypted = crypto.privateDecrypt({
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PADDING,
  }, buffer2)
  // 将解密后的内容转码成UTF-8的格式返回
  return decrypted.toString('utf-8')
}

 