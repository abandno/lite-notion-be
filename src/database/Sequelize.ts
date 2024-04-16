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

