import {Ret} from "@/objects/Ret";
const express = require('express');
const router = express.Router();
const {addDocument, deleteDocument, listDocument} = require("@/service/DocumentService");

router.post("/add", async (req, res) => {
  const result = await addDocument()

  res.send(Ret.success(result))
})
router.post("/delete", async (req, res) => {
  const result = await deleteDocument()

  res.send(Ret.success(result))
})

router.get("/list", async (req, res) => {
  const result = await listDocument()

  res.send(Ret.success(result))
})

module.exports = router;
