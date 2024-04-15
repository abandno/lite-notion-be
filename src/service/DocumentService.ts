


/**
 *
 */
async function addDocument() {
  return {
    id: 1,
    title: "title",
    content: "content",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
}

async function deleteDocument() {
  return {}
}


module.exports = {
  addDocument,
  deleteDocument,
}
