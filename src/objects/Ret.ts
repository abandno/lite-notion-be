const {ErrorCode} = require("@/constants");
const Utils = require("@/utils")

export class Ret {
  requestId:string;
  code: number;
  msg: string;
  data: any;
  error: string;

  constructor(code: number, msg: string, data: any) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  static success(data: any) {
    return new Ret(ErrorCode.SUCCESS, 'success', data)
  }

  static fail(data: any, code = ErrorCode.SERVER_ERROR, msg = "fail") {
    return new Ret(code, msg, data)
  }

  appendError(error: string) {
    this.error = Utils.join(";", this.error, error)
    return this;
  }

}
