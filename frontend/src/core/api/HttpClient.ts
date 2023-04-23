import { HttpMethod, RequestOptions } from "../interface/HttpInterface";
import { generateUrlString } from "./HttpUtils";

export const httpService = ({
  method,
  path,
  routeParameters = {},
  body = {},
}: RequestOptions) => {
  const url = generateUrlString(path, routeParameters);

  const headers = {
    "Content-Type":
      body instanceof FormData ? "multipart/form-data" : "application/json",
  };

  const config: RequestInit = {
    method,
    headers,
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    body:
      method === "POST" || method === "PUT" || method === "PATCH"
        ? body instanceof FormData
          ? body
          : JSON.stringify(body)
        : undefined,
  };

  return fetch(url, config);
};

// const fetchApi = (url: any, method: HttpMethod, body: any) => {
//   const config: RequestInit = {
//     method: method,
//     headers: {
//       "Content-Type":
//         body instanceof FormData ? "multipart/form-data" : "application/json",
//     },
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     // credentials: "same-origin", // include, *same-origin, omit
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer",
//     body:
//       method === "POST" || method === "PUT" || method === "PATCH"
//         ? body instanceof FormData
//           ? body
//           : JSON.stringify(body)
//         : undefined,
//   };

//   return fetch(url, config);
// };
