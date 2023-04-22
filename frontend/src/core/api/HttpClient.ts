import {
  FetchConfigType,
  HttpMethod,
  RequestBodyType,
  RouteParametersType,
} from "../interface/HttpInterface";
import { generateUrlString } from "./HttpUtils";

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
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    "Access-Control-Max-Age": 600,
  };

  if (method == "POST" || method == "PUT" || method == "PATCH") {
    config["body"] = body instanceof FormData ? body : JSON.stringify(body);
  }

  return fetch(url, config);
};
