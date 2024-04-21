import { Database, DatabaseConfiguration } from '@hocuspocus/extension-database'
import mysql from 'mysql2/promise'
import {SQLiteConfiguration} from "@hocuspocus/extension-sqlite/src/SQLite";

export const schema = `CREATE TABLE IF NOT EXISTS doc_content (
  id bigint(20) unsigned NOT NULL COMMENT '文档id',
  content mediumblob COMMENT '文档内容',
  created_at datetime(3) DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  created_by varchar(255) DEFAULT NULL COMMENT '创建者',
  updated_at datetime(3) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',
  updated_by varchar(255) DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文档内容';
`

export const selectQuery = `
  SELECT content FROM doc_content WHERE id = ?
`

export const upsertQuery = `
  INSERT INTO doc_content (id, content) VALUES (?, ?)
    ON DUPLICATE KEY UPDATE content = VALUES(content)
`

export interface MySQLConfiguration extends DatabaseConfiguration {
  /**
   * The MySQL connection configuration.
   */
  connection: mysql.ConnectionOptions,
  /**
   * The database schema to create.
   */
  schema: string,
}

export class MySQL extends Database {
  connection?: mysql.Connection

  configuration: MySQLConfiguration = {
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'password',
      database: 'database',
    },
    schema,
    fetch: async ({ documentName }) => {
      const [rows] = await this.connection?.execute(selectQuery, [documentName])
      return rows[0]?.content
    },
    store: async ({ documentName, state }) => {
      console.log("===== Mysql store documentName", documentName);
      await this.connection?.execute(upsertQuery, [documentName, state])
    },
  }

  constructor(configuration?: Partial<MySQLConfiguration>) {
    super({})

    this.configuration = {
      ...this.configuration,
      ...configuration,
    }
  }

  async onConfigure() {
    this.connection = await mysql.createConnection(this.configuration.connection)
    await this.connection.execute(this.configuration.schema)
  }

  async onListen() {
    console.log('MySQL extension is listening.')
  }
}
