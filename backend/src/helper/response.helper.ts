import { Logger } from "./logger";

export class ResponseBuilder {
  static generateResponse(type: "success" | "error", msg: any) {
    if (type == "success") return { success: true, result: msg };
    return { success: false, result: null, error: msg };
  }

  static successResponse(msg: any) {
    return { success: true, result: msg };
  }

  static errorResponse(msg: any, traceError: any = "") {
    Logger(msg, traceError);
    return { success: false, result: null, error: msg };
  }
}
