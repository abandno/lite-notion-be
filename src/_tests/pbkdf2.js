const CryptoJS = require("crypto-js");

const password = "password";

function extracted() {
  const t = new Date().getTime()
  const salt = CryptoJS.lib.WordArray.random(16); // 生成随机的盐值
  const derivedKey = CryptoJS.PBKDF2(password, salt, {
    keySize: 8,
    // iterations: 100000,
    iterations: 1000,
    hasher: CryptoJS.algo.SHA512
  });
  console.log(new Date().getTime() - t)

  console.log(derivedKey.toString(CryptoJS.enc.Base64)); // 输出PBKDF2派生密钥的十六进制表示
}

for (let i = 0; i < 2; i++) {
  extracted();
}
