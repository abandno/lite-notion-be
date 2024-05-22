import {Ret} from "@/objects/Ret";

const express = require('express');
const router = express.Router();
import {
  addDocument, deleteDocument, listDocument, moveNode,
  updateDocInfo, getDocInfo
} from "@/service/DocumentService"

class RouterWrapper {
  private router: any;

  constructor(router) {
    this.router = router;
  }

  get(path: string, handler: any) {
    this.router.get(path, async (req, res, next) => {
      try {
        const result = await handler(req, res)
        res.send(Ret.success(result))
      } catch (e) {
        next(e);
      }
    })
  }

  post(path: string, handler: any) {
    this.router.post(path, async (req, res, next) => {
      try {
        const result = await handler(req, res)
        res.send(Ret.success(result))
      } catch (e) {
        next(e);
      }
    })
  }
}

const routerWrapper = new RouterWrapper(router);

routerWrapper.post("/add", async (req) => {
  return await addDocument(req.body);
})

routerWrapper.post("/delete", async (req) => {
  return await deleteDocument(req.body);
})

router.get("/list", async (req, res) => {
  const params = req.query;
  const result = await listDocument(params)

  res.send(Ret.success(result))
})

routerWrapper.post("/moveNode", async (req) => {
  return await moveNode(req.body)
})

// 重命名文档 title
routerWrapper.post("/updateDocInfo", async (req, res) => {
  return await updateDocInfo(req.body)
})

// docInfo by Id
routerWrapper.get("/docInfo", async (req, res) => {
  return await getDocInfo(req.query)
})

module.exports = router;
