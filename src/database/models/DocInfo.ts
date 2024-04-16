import {DataTypes, Model} from "sequelize";
import {sequelize} from "@/database/Sequelize";


export class DocInfo extends Model {}
DocInfo.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: { // 通常将列名 user_id 改为驼峰式命名的 userId 在 JavaScript 中使用
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.TINYINT({length:1}),
    allowNull: true,
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
  tableName: 'doc_info',
  timestamps: false, // 由于表中已有 created_at 和 updated_at 字段，禁用 Sequelize 自动管理的时间戳字段
  underscored: true, // 如果希望在模型属性与数据库列名之间使用下划线命名约定（例如，`createdBy` 对应 `created_by`），启用此选项
  paranoid: false, // 由于表中已有 is_deleted 字段，无需启用 Sequelize 的软删除功能
  comment: '文档信息', // 添加表注释，与原始 SQL 语句中的 COMMENT 相对应
});
