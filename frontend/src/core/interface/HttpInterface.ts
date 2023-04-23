export type HttpStatus = "started" | "success" | "error";
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpPayload {
  requestName: string;
  status: HttpStatus;
  statusCode: number;
  message?: string;
  other?: any;
}

export interface ApiRegistryType {
  [index: string]: any;
}
export interface OptionsType {
  fetchCall: any;
  onSuccess: any;
  onError: any;
  postOp: any;
}

export interface RequestBodyType {
  [index: string]: any;
}

export interface RouteParametersType {
  [index: string]: any;
}

export interface FetchConfigType {
  method: HttpMethod;
  headers: any;
  body?: any;
  [index: string]: any;
}

export interface RequestOptions {
  method: HttpMethod;
  path: string;
  routeParameters?: RouteParametersType;
  body?: RequestBodyType;
}
