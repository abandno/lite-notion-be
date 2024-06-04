/**
 * 拼接若干字符串
 * @param joiner
 * @param eles
 */
export const join = (joiner: string, ...eles): string => {
  let ret = "";
  for (const e of eles) {
    if (e == null) {
      continue;
    }
    if (ret) {
      ret += joiner;
    }
    ret += e;
  }
  return ret;
}

// 定义数字字符集
const NUMBERS = '0123456789';

// 生成4位随机数字验证码
export function randomNumber(length) {
  let code = '';

  // 循环生成随机数字
  for (let i = 0; i < length; i++) {
    code += NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
  }

  return code;
}


const ALPHABET_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function randomNickname(phoneNumber) {
  let randomAlpha = '';
  for (let i = 0; i < 4; i++) {
    randomAlpha += ALPHABET_UPPER[Math.floor(Math.random() * ALPHABET_UPPER.length)];
  }
  const suffix = phoneNumber.slice(-4);
  return `${randomAlpha}${suffix}`;
}
