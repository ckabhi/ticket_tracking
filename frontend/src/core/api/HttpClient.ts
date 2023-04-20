import {
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
  return requestObject[method](path, routeParameters);
};

const requestObject: RequestObjectType = {
  GET: (path: string, routeParameters: RouteParametersType) => {
    const url = generateUrlString(path, routeParameters);
    return fetch(url);
  },
  POST: (path: string, routeParameters: RouteParametersType) => {
    const url = generateUrlString(path, routeParameters);
    return fetch(url);
  },
  PUT: (path: string, routeParameters: RouteParametersType) => {
    const url = generateUrlString(path, routeParameters);
    return fetch(url);
  },
  PATCH: (path: string, routeParameters: RouteParametersType) => {
    const url = generateUrlString(path, routeParameters);
    return fetch(url);
  },
  DELETE: (path: string, routeParameters: RouteParametersType) => {
    const url = generateUrlString(path, routeParameters);
    return fetch(url);
  },
};
