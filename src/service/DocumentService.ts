import {DocInfo} from "@/database/models/DocInfo";


/**
 *
 */
async function addDocument() {
  // 生成文档, 返回文档id
  // doc_info 表新增一条记录, 自增id, 返回
  const docInfo = await DocInfo.create({userId: 1, title: "未命名"});
  return docInfo.dataValues;
}

async function deleteDocument() {
  return {}
}

/**
 *
 * @param params {level: 0}
 */
async function listDocument(params) {
  const {level = 0, pid} = params;
  let options = {
    where: {
      level,
      ...(pid != null && { pid })
    },
    limit: 100,
  };
  return await DocInfo.findAll(options);
}

module.exports = {
  addDocument,
  deleteDocument,
  listDocument,
}
