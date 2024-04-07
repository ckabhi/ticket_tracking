import { HttpStatus } from "./HttpRequest.interface";

export interface HttpRequestStatusData {
  status: HttpStatus;
  statusCode?: number | null;
  errorMessage?: string;
}

export interface HttpRequestStatusPayload extends HttpRequestStatusData {
  action: any;
}

export interface HttpRequestActionReturnData {
  type: string;
  payload: HttpRequestStatusPayload;
}

export interface HttpRequestStatus {
  [index: string]: HttpRequestStatusData;
}
