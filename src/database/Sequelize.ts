import {Sequelize} from "sequelize";
import Config from "@/config"
const config = Config.getConfig("mysql");

export const sequelize = new Sequelize({
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  ...config,
});

export const doTransaction = async (func) => {
  let t;
  try {
    t = await sequelize.transaction();
    const res = await func(t);
    await t.commit();
    return res;
  } catch (e) {
    if (t) await t.rollback();
    throw e;
  }
}
