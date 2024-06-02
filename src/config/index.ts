const DevConfig = {
  mysql_host: 'localhost',
  mysql_port: 33306,
  mysql_username: 'root',
  mysql_password: '1234',
  mysql_database: 'lite-notion'
}

const ProdConfig = {}

const configByEnv = process.env.NODE_ENV === "production" ? ProdConfig : DevConfig;

const config = {
  // 通用配置
  // 分环境配置
  ...configByEnv,
};

const getConfig = (prefix) => {
  prefix = prefix += "_";
  const ret = {};
  for (let key in config) {
    if (key.startsWith(prefix)) {
      const k = key.substring(prefix.length);
      ret[k] = config[key];
    }
  }
  return ret;
}

export default {
  ...config,
  getConfig,
  /**
   * "mysql_host", "mysql_port"
   * => { host: "localhost", port: 33306 }
   * @param prefix
   * @param Clazz
   */
  getConfigBean: (prefix, Clazz): typeof Clazz => {
    const conf = getConfig(prefix);
    const c = new Clazz();
    Object.assign(c, conf);
    return c;
  }
};
