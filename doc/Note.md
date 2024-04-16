


## ORM 框架

[Getting Started | Sequelize](https://sequelize.org/docs/v6/getting-started/)

```js
const { sequelize } = require('./path/to/your/sequelize/config');

// 假设有一个复杂的连表查询，如：
const complexJoinQuery = `
  SELECT a.*, b.some_column
  FROM TableA a
  INNER JOIN TableB b ON a.id = b.table_a_id
  WHERE a.status = 'active' AND b.date > :startDate
`;

// 使用 `sequelize.query()` 执行该查询，并传递参数
const startDate = new Date('2024-04-01');
sequelize.query(complexJoinQuery, {
  replacements: { startDate }, // 参数替换
  type: sequelize.QueryTypes.SELECT, // 指定查询类型为 SELECT
})
.then((results) => {
  console.log('Query results:', results);
})
.catch((error) => {
  console.error('Error executing query:', error);
});

```


非ORM框架方式示例:
```js
import Config from "@/config"
import mysql from 'mysql2/promise'
const config = Config.getConfig("mysql");
const pool = mysql.createPool({...config});
pool.getConnection()
    .then(async conn => {
      const [rows, fields] = await conn.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);
    })
```


## 为什么我这个项目 node model.exports 模式和export import 模式可以混用?

Node.js v16.13.0 及更高版本引入了 
`--experimental-specifier-resolution=node` 标志，
使得在不改变 package.json 类型的情况下，可以在 .js 文件中混用 import 和 require，
前提是项目结构支持这种混合模式。
