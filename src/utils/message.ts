import { ResponseVO } from "../model/vo/responseVo";

enum StatusCode {
  success = 200,
  error = 400,
}

class Result {
  private statusCode: number;
  private code: number;
  private message: string;
  private data?: any;

  constructor(statusCode: number, code: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString() {
    return {
      statusCode: this.statusCode,
      body: {
        code: this.code,
        message: this.message,
        data: this.data,
      },
    };
  }
}

export class MessageUtil {
  static success(data: any, code: number): ResponseVO {
    const result = new Result(StatusCode.success, code, "success", data);

    return result.bodyToString();
  }

  static error(code: number, message: string) {
    const result = new Result(StatusCode.error, code, message);
    return result.bodyToString();
  }
}
