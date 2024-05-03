import {DocInfo} from "@/database/models/DocInfo";
import {doTransaction} from "@/database/Sequelize";
import {TipError} from "@/utils/exceptions";

const getInitName = (type) => {
  if (type === "1") {
    return "未命名文档";
  }
  if (type === "2") {
    return "未命名画板";
  }
  return "未命名文档";
}

/**
 *
 */
async function addDocument({pid, type, level}) {
  return doTransaction(async () => {
    // 生成文档, 返回文档id
    // doc_info 表新增一条记录, 自增id, 返回
    const docInfo = await DocInfo.create({userId: 1, title: getInitName(type), pid, type, level});

    // pid 对应的 subSize 增1
    if (pid != null) {
      // const parentDocInfo = await DocInfo.findOne({where: {id: pid}});
      // await parentDocInfo.increment('subSize');
      await DocInfo.increment('subSize', {where: {id: pid}});
    }

    return docInfo;
  });
}

async function deleteDocument({id}) {
  // 还有子文档, 暂不允许删除
  const subSize = await DocInfo.count({where: {pid: id}})
  if (subSize) {
    throw new TipError("请先删除所有子文档");
  }

  return doTransaction(async () => {
    console.log("deleteDocument", id);
    const docInfoDb = await DocInfo.findOne({where: {id}})
    if (docInfoDb) {
      await docInfoDb.update({isDeleted: 1});
      await DocInfo.decrement('subSize', {where: {id: docInfoDb.get('pid')}});

    }
    return docInfoDb;
  });
}

/**
 *
 * @param params {level: 0}
 */
async function listDocument(params) {
  const {userId, level = 0, pid} = params;
  let options = {
    where: {
      isDeleted: 0,
      userId,
      ...(pid != null && {pid})
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
