import { Middleware } from "@reduxjs/toolkit";
import { getApiRegistry, apiRegistryHas } from "../api/apiRegistry";
import { HTTP_REQUEST } from "../actionType/coreActionType";
import { HttpRequestStatusData } from "../interface/HttpAction.interface";

/**
 * @description HandleSuccess will dispatch all the actions after success of api call
 * @function handleSuccess
 * @param {Object} responseData response data from api request
 * @param {[]} onSuccess list of actions that will be dispatch one by one
 * @param next next function
 */
const handleSuccess = (
  responseData: any,
  onSuccess: any,
  next: any,
  storeApi: any
) => {
  const OnSuccessHandler = onSuccess(responseData);
  if (Array.isArray(OnSuccessHandler)) {
    OnSuccessHandler.forEach((act: any) => {
      if (apiRegistryHas(act?.type)) {
        storeApi.dispatch(act);
      } else {
        next(act);
      }
    });
  }
};

/**
 * @description handleError will dispatch all the actions after failure of api call
 * @function handleError
 * @param {Object} response response data from api request
 * @param {[]} onError list of actions that will be dispatch one by one
 * @param next next function
 */
const handleError = (
  response: Response,
  onError: any,
  next: any,
  storeApi: any
) => {
  const errorData = {
    errorCode: response.status,
    errorMessage: Object.keys(response).length ? response : "",
  };
  const OnErrorHandler = onError(errorData);
  if (Array.isArray(OnErrorHandler)) {
    OnErrorHandler.forEach((err: any) => {
      if (apiRegistryHas(err?.type)) {
        storeApi.dispatch(err);
      } else {
        next(err);
      }
    });
  }
  // next({ type: HTTP_ERROR, payload: { isError: true, ...errorData } });
  // setTimeout(() => {   // bad to introduce this here
  //   next({ type: HTTP_ERROR, payload: {} });
  // }, 3000);
};

/**
 * @description This function perform the api call and perform action after response
 * @function executeApiCall
 * @param action action data
 * @param {Object} apiHandler api handler object consist of onSuccess, onError and postOp
 * @param next next function
 */
const executeApiCall = async (
  action: any,
  apiHandler: any,
  next: any,
  storeApi: any
) => {
  const httpRequestStatusData: HttpRequestStatusData = {
    status: "started",
    statusCode: null,
    errorMessage: "",
  };

  // dispatch action to update the request status
  next({ type: HTTP_REQUEST, payload: { action, ...httpRequestStatusData } });

  try {
    const response = await apiHandler.fetchCall(action);
    const responseData = apiHandler.postOp(await response.json());

    httpRequestStatusData.statusCode = response?.status; // overidding status code

    if (response.ok && response.status === 200) {
      httpRequestStatusData.status = "success";

      // Handle success action
      handleSuccess(responseData, apiHandler.onSuccess, next, storeApi);
    } else {
      httpRequestStatusData.status = "error";
      httpRequestStatusData.errorMessage = JSON.stringify(response?.message);

      // Handle error action
      handleError(response, apiHandler.onError, next, storeApi);
    }
  } catch (error) {
    console.error(error);
    httpRequestStatusData.status = "error"; // overidding http status
    httpRequestStatusData.errorMessage = JSON.stringify(error);

    // next({ type: HTTP_ERROR, payload: {} });
  } finally {
    // dispatch action to update the request status
    next({ type: HTTP_REQUEST, payload: { action, ...httpRequestStatusData } });
  }
};

export const myMiddleware: Middleware =
  (storeAPI) => (next) => async (action) => {
    const apiHandler = getApiRegistry(action.type);
    if (apiHandler === null) {
      return next(action);
    }

    await executeApiCall(action, apiHandler, next, storeAPI);
  };

/*
 * Old code
 */

// export const myMiddleware: Middleware =
//   (storeAPI) => (next) => async (action) => {
//     const apiHandler = getApiRegistry(action.type);
//     if (apiHandler === null) {
//       // Not an api call and moving to next middleware
//       return next(action);
//     }

//     const { fetchCall, onSuccess, onError, postOp } = apiHandler;
//     try {
//       next(action);
//       // Set http request status to true
//       next({ type: HTTP_REQUEST, payload: { action, inProgress: true } });

//       const response = await fetchCall(action);
//       const responseData = postOp(await response.json());

//       // Execute success handler
//       if (response.ok && response.status === 200) {
//         const OnSuccessHandler = onSuccess(responseData);
//         if (Array.isArray(OnSuccessHandler)) {
//           OnSuccessHandler.forEach((act) => {
//             next(act);
//           });

//           // Set http request status to false
//           next({ type: HTTP_REQUEST, payload: { action, inProgress: false } });
//         }
//       } else {
//         // Execute error handler
//         const errorData = {
//           errorCode: response.status,
//           errorMessage: Object.keys(responseData).length ? responseData : "",
//         };
//         const OnErrorHandler = onError(errorData);
//         if (Array.isArray(OnErrorHandler)) {
//           OnErrorHandler.forEach((err) => {
//             next(err);
//           });
//         }

//         // Set http request status to false
//         next({ type: HTTP_REQUEST, payload: { action, inProgress: false } });

//         // set httpError
//         next({ type: HTTP_ERROR, payload: { isError: true, ...errorData } });
//         setTimeout(() => {
//           next({ type: HTTP_ERROR, payload: {} });
//         }, 3000);
//       }
//     } catch (error) {
//       console.error("error");
//       return next(action);
//     }
//     return;
//   };
