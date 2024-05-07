import {DataTypes, Model} from "sequelize";
import {sequelize} from "@/database/Sequelize";

export class DocSpace extends Model {}

DocSpace.init({
  // 定义模型属性
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    comment: '空间id'
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '空间名'
  },
  created_at: {
    type: DataTypes.DATE(3),
    comment: '创建时间'
  },
  created_by: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '创建者'
  },
  updated_at: {
    type: DataTypes.DATE(3),
    allowNull: true,
    comment: '更新时间'
  },
  updated_by: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '更新者'
  }
}, {
  // 其他模型选项
  sequelize, // 连接实例
  modelName: 'DocSpace', // 模型名称
  timestamps: false, // 因为已有自定义的时间戳字段，所以默认的createdAt和updatedAt设置为false
  tableName: 'doc_space', // 表名
  charset: 'utf8mb4', // 字符集
  comment: '文档空间' // 表注释
});

