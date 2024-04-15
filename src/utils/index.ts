/**
 * 拼接若干字符串
 * @param joiner
 * @param eles
 */
const join = (joiner: string, ...eles): string => {
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

module.exports = {
  join,
}
