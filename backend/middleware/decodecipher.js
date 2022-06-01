const CryptoJS = require("crypto-js");
const chalk = require("chalk");

exports.decodeData = async (req, res, next) => {
  //   req.body = JSON.parse(
  console.log(chalk.yellowBright("Data received: ", req.body.ciphertext));
  var bytes = CryptoJS.AES.decrypt(req.body.ciphertext, "my-secret-key@123");
  var plaintext = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  req.body = plaintext;
  console.log(chalk.redBright("After decryption: ", JSON.stringify(plaintext)));
  next();
};
