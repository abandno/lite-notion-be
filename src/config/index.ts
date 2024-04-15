const errorCodes = require("./ErrorCode");


const DevConfig = {
  ErrorCode: errorCodes,
}

const ProdConfig = {
  ErrorCode: errorCodes,
}

module.exports = process.env.NODE_ENV === "production" ? ProdConfig : DevConfig;
