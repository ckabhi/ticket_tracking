import {
  FetchConfigType,
  HttpMethod,
  RequestBodyType,
  RouteParametersType,
} from "../interface/HttpInterface";
import { generateUrlString } from "./HttpUtils";
type RequestObjectType = {
  [index in HttpMethod]: any;
};

export const httpRegister = (
  method: HttpMethod,
  path: string,
  routeParameters: RouteParametersType = {},
  body: RequestBodyType = {}
) => {
  const url = generateUrlString(path, routeParameters);
  return fetchApi(url, method, body);
};

const fetchApi = (url: any, method: HttpMethod, body: any) => {
  const config: FetchConfigType = {
    method: method,
    headers: {
      "Content-Type":
        body instanceof FormData ? "multipart/form-data" : "application/json",
    },
  };
  if (method == "POST" || method == "PUT" || method == "PATCH") {
    config["body"] = body instanceof FormData ? body : JSON.stringify(body);
  }

  return fetch(url, config);
};
