const {ErrorCode} = require("@/constants");
import {join} from "@/utils";

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

  setMsg(msg: string) {
    this.msg = msg
    return this;
  }

  appendError(error: string) {
    this.error = join(";", this.error, error)
    return this;
  }

}
