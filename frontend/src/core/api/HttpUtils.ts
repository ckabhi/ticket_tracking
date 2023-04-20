import { RouteParametersType } from "../interface/HttpInterface";
import {
  PROTOCOL,
  ORIGIN,
  BASE_PATH,
  INCLUDE_BASE_PATH,
} from "../config/apiConfig";

//not used
export const getPathParameter = (url: string) => {
  let startIndex = 0;
  let endIndex = 0;
  let isStartFound = false;
  let isEndFound = false;
  const pathParams = [];
  for (let i = 0; i <= url.length; i++) {
    if (!isStartFound && url.charAt(i) == ":") {
      startIndex = i + 1;
      isStartFound = true;
    }
    if (isStartFound && !isEndFound && url.charAt(i) == "/") {
      endIndex = i;
      isEndFound = true;
    }
    if (isStartFound && !isEndFound && i == url.length) {
      isEndFound = true;
      endIndex = -1;
    }
    if (isStartFound && isEndFound) {
      console.log({ startIndex, endIndex });
      if (endIndex == -1) {
        pathParams.push(url.substring(startIndex));
      } else {
        pathParams.push(url.substring(startIndex, endIndex));
      }

      isStartFound = false;
      isEndFound = false;
    }
  }
  return pathParams;
};

const buildBaseUrl = () => {
  let urlString = "";
  let basePath = INCLUDE_BASE_PATH ? BASE_PATH : "";
  urlString = urlString.concat(PROTOCOL, "://", ORIGIN, basePath);
  return urlString;
};

const insertRouteParameterValue = (
  path: string,
  pathParams: RouteParametersType
) => {
  let route = path;
  Object.keys(pathParams).forEach((key) => {
    let pattern = ":".concat(key);
    route = route.replaceAll(pattern, pathParams[key]);
  });

  return route;
};

const filterQueryParameter = (
  path: string,
  routeParameters: RouteParametersType
) => {
  const queryParameter = Object.keys(routeParameters).filter((key) => {
    const pattern = ":".concat(key.toString());
    if (path.indexOf(pattern) == -1) {
      return key;
    }
  });
  return queryParameter;
};

export const generateUrlString = (
  path: string,
  routeParameters: RouteParametersType
) => {
  try {
    const url = new URL(
      insertRouteParameterValue(path, routeParameters),
      buildBaseUrl()
    );
    filterQueryParameter(path, routeParameters).forEach((key) => {
      url.searchParams.append(key, routeParameters[key].toString());
    });

    return url;
  } catch (err) {
    console.error("Error while generating url String");
    return "";
  }
};
