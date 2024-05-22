import { DocInfo, DocSpace } from "@/database/models";
import { doTransaction } from "@/database/Sequelize";
import { TipError } from "@/utils/exceptions";
import { OrderItem } from "sequelize";

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
export async function addDocument({ pid, type, level, sort }) {
  return doTransaction(async () => {
    // 生成文档, 返回文档id
    // doc_info 表新增一条记录, 自增id, 返回
    const docInfo = await DocInfo.create({ userId: 1, title: getInitName(type), pid, type, level, sort });

    // pid 对应的 subSize 增1
    if (pid != null) {
      // const parentDocInfo = await DocInfo.findOne({where: {id: pid}});
      // await parentDocInfo.increment('subSize');
      await DocInfo.increment('subSize', { where: { id: pid } });
    }

    return docInfo;
  });
}

export async function deleteDocument({ id }) {
  // 还有子文档, 暂不允许删除
  const subSize = await DocInfo.count({ where: { pid: id } })
  if (subSize) {
    throw new TipError("请先删除所有子文档");
  }

  return doTransaction(async () => {
    console.log("deleteDocument", id);
    const docInfoDb = await DocInfo.findOne({ where: { id } })
    if (docInfoDb) {
      await docInfoDb.update({ isDeleted: 1 });
      await DocInfo.decrement('subSize', { where: { id: docInfoDb.get('pid') } });

    }
    return docInfoDb;
  });
}

/**
 *
 * @param params {level: 0}
 */
export async function listDocument(params) {
  const { userId, level = 0, pid } = params;
  // 空间列表, 构造节点
  const docSpaces = await DocSpace.findAll();
  const nodes = docSpaces.map(e => {
    const row = e.dataValues;
    return {
      id: row.id,
      title: row.name,
      pid: 0,
    }
  })

  let options = {
    where: {
      isDeleted: 0,
      userId,
      ...(pid != null && { pid })
    },
    order: [
      ['sort', 'ASC']
    ] as OrderItem[],
    limit: 100,
  };
  const docList = await DocInfo.findAll(options);
  docList.forEach(e => {
    const row = e.dataValues;
    nodes.push(row);
  })
  return nodes;
}

export async function moveNode({ node, prevPid }) {
  return doTransaction(async () => {
    await DocInfo.update({ ...node }, {
      where: {
        id: node.id
      }
    })
    await DocInfo.increment('subSize', { where: { id: node.pid } })
    await DocInfo.decrement('subSize', { where: { id: prevPid } })
  })
}


export async function updateDocInfo({ id, title }) {
  return doTransaction(async () => {
    const affectedRows = await DocInfo.update(
      { title },
      { where: { id } }
    );
  })
}

export async function getDocInfo({ id }) {
  return await DocInfo.findByPk(id)
}
