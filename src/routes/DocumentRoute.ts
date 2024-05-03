import {Ret} from "@/objects/Ret";

const express = require('express');
const router = express.Router();
const {addDocument, deleteDocument, listDocument} = require("@/service/DocumentService");

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

module.exports = router;
