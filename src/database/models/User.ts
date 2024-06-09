import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/database/Sequelize";

class User extends Model {}
export default User.init<any,any>({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: '用户id',
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
    comment: '用户名',
  },
  phone: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
    unique: true,
    comment: '手机号',
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
    comment: '密码',
  },
  nickname: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
    comment: '昵称',
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
    comment: '邮箱',
  },
  avatar: {
    type: DataTypes.STRING,
    comment: '头像',
  },
  createdAt: {
    type: DataTypes.DATE(3), // 或者使用 DataTypes.DATEONLY / DataTypes.DATE(0) 如果不需要时间部分
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE(3), // 或者使用 DataTypes.DATEONLY / DataTypes.DATE(0) 如果不需要时间部分
    allowNull: true,
  },
  updatedBy: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  sequelize, // 假设此处的 sequelize 已经正确实例化
  tableName: 'user',
  timestamps: false, // 假设原表没有自动管理的时间戳字段
  underscored: true, // 原表使用的是驼峰命名，所以这里设置为false
  paranoid: false, // 表中有is_deleted字段的话应启用，但根据原表结构，此表未包含逻辑删除字段，故设为false
  comment: '用户表', // 添加表注释
});
