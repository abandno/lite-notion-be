import {Ret} from "@/objects/Ret";

const express = require('express');
import {
  addDocument, deleteDocument, listDocument, moveNode,
  updateDocInfo, getDocInfo
} from "@/service/DocumentService"
import { createRouter } from "./RouterWrapper";
import { escape } from "querystring";

const routerW = createRouter()
export const documentRouter = routerW.Router();

routerW.post("/add", async (req) => {
  return await addDocument(req.body);
})

routerW.post("/delete", async (req) => {
  return await deleteDocument(req.body);
})

routerW.get("/list", async (req, res) => {
  const params = req.query;
  const result = await listDocument(params)

  // res.send(Ret.success(result))
  return result
})

routerW.post("/moveNode", async (req) => {
  return await moveNode(req.body)
})

// 重命名文档 title
routerW.post("/updateDocInfo", async (req, res) => {
  return await updateDocInfo(req.body)
})

// docInfo by Id
routerW.get("/docInfo", async (req, res) => {
  return await getDocInfo(req.query)
})

