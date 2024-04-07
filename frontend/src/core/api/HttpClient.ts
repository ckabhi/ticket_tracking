import { RequestOptions } from "../interface/HttpRequest.interface";
import { generateUrlString, isTokenExpired } from "./HttpUtils";
import { SecureStorage } from "../../redux/store/store";
import { refreshToken as refreshTokenUrl } from "../../api/routes";

// export const httpService = (
//   { method, path, routeParameters = {}, body = {} }: RequestOptions,
//   isProtected = false
// ) => {
//   const url = generateUrlString(path, routeParameters);

//   const headers: Headers = new Headers();
//   if (body instanceof FormData) {
//     headers.append("Content-Type", "multipart/form-data");
//   } else {
//     headers.append("Content-Type", "application/json");
//   }

//   if (isProtected) {
//     const accessToken: String | null = SecureStorage.getAccessToken();
//     headers.append("Authorization", `Bearer ${accessToken}`);
//   }

//   // const headers: Headers = {
//   //   "Content-Type":
//   //     body instanceof FormData ? "multipart/form-data" : "application/json",
//   //     // "Authorization": isProtected ? SecureStorage.getAccessToken() : ''
//   // };

//   const config: RequestInit = {
//     method,
//     headers,
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

//   return requestInterceptor(url, config, isProtected);
// };

// const requestInterceptor = async (
//   url: URL | "",
//   options: RequestInit,
//   isProtected: boolean
// ) => {
//   const accessToken: String | null = SecureStorage.getAccessToken();
//   if (accessToken !== null && isProtected) {
//     const newHeaders = new Headers(options.headers);
//     newHeaders.delete("Authorization");
//     newHeaders.append("Authorization", `Bearer ${accessToken}`);
//     options.headers = newHeaders;
//   }

//   if (isProtected && accessToken !== null && isTokenExpired(accessToken)) {
//     const refreshToken: String | null = SecureStorage.getRefreshToken();
//     if (refreshToken) {
//       try {
//         const refreshUrl = generateUrlString(refreshTokenUrl, {});
//         const response = await fetch(refreshUrl, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${refreshToken}`,
//           },
//         });
//         const result = await response.json();
//         if (response.ok && response.status === 200) {
//           SecureStorage.setRefreshToken(result.result.refreshToken);
//           SecureStorage.setAccessToken(result.result.accessToken);

//           const newHeaders = new Headers(options.headers);
//           newHeaders.delete("Authorization");
//           newHeaders.append("Authorization", `Bearer ${accessToken}`);
//           options.headers = newHeaders;
//         } else {
//           SecureStorage.removeToken();
//           // TODO:: Handle the failuire and notify user about it.
//           throw new Error(`Request Failed with status ${response.status}`);
//         }
//       } catch (error) {
//         SecureStorage.removeToken();
//       }
//     }
//   }

//   return fetch(url, options);
// };

// const httpPostOperation = (postFunction) => {

// }

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

/*
 * New Improve logic to perform http request
 */
// TODO:: apply dependency inversion for secure storage and refresh url

const createHeaders = (body: FormData | Record<string, any>) => {
  const headers: Headers = new Headers();
  if (body instanceof FormData) {
    headers.append("Content-Type", "multipart/form-data");
  } else {
    headers.append("Content-Type", "application/json");
  }
  return headers;
};

const appendAuthorizationHeader = (
  options: RequestInit,
  accessToken: string
) => {
  const newHeaders = new Headers(options.headers);
  newHeaders.delete("Authorization");
  newHeaders.append("Authorization", `Bearer ${accessToken}`);
  options.headers = newHeaders;
};

const refreshTokenIfNeeded = async (options: RequestInit) => {
  const accessToken = SecureStorage.getAccessToken();
  if (!accessToken || !isTokenExpired(accessToken)) return;

  const refreshToken = SecureStorage.getRefreshToken();
  if (!refreshToken) {
    SecureStorage.removeToken();
    return;
  }

  try {
    const response = await fetch(generateUrlString(refreshTokenUrl, {}), {
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    if (response.ok) {
      const result = await response.json();
      SecureStorage.setRefreshToken(result.result.refreshToken);
      SecureStorage.setAccessToken(result.result.accessToken);
      appendAuthorizationHeader(options, result.result.accessToken);
    } else {
      SecureStorage.removeToken();
      throw new Error(`Request Failed with status ${response.status}`);
    }
  } catch (error) {
    SecureStorage.removeToken();
    throw new Error("Token Refresh Failed");
  }
};

export const httpService = async (
  { method, path, routeParameters = {}, body = {} }: RequestOptions,
  isProtected: boolean = true
) => {
  const url = generateUrlString(path, routeParameters);
  const headers = createHeaders(body);

  const options: RequestInit = {
    method,
    headers,
    mode: "cors",
    cache: "no-cache",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body:
      method === "POST" || method === "PUT" || method === "PATCH"
        ? body instanceof FormData
          ? body
          : JSON.stringify(body)
        : undefined,
  };

  if (isProtected) {
    const accessToken = SecureStorage.getAccessToken();
    if (accessToken) appendAuthorizationHeader(options, accessToken);
    await refreshTokenIfNeeded(options);
  }

  return fetch(url, options);
};
