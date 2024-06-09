import {ErrorCode} from "@/constants";

export class TipError extends Error {
  code: number;
  error: string;
  constructor(message?: string, code:number = ErrorCode.SERVER_ERROR, error = null) {
    super(message); // 调用父类的构造函数
    this.code = code;
    this.error = error;
  }

  prettyString() {
    return `${this.code}:${this.message}:${this.error}`
  }

}
