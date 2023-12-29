import { Middleware } from "@reduxjs/toolkit";
import { getApiRegistry } from "../api/apiRegistry";
import { HTTP_ERROR, HTTP_REQUEST } from "../actionType/coreActionType";

const handleSuccess = (responseData: any, onSuccess: any, next: any) => {
  const OnSuccessHandler = onSuccess(responseData);
  if (Array.isArray(OnSuccessHandler)) {
    OnSuccessHandler.forEach((act: any) => {
      next(act);
    });
  }
};

const handleError = (response: Response, onError: any, next: any) => {
  const errorData = {
    errorCode: response.status,
    errorMessage: Object.keys(response).length ? response : "",
  };
  const OnErrorHandler = onError(errorData);
  if (Array.isArray(OnErrorHandler)) {
    OnErrorHandler.forEach((err: any) => {
      next(err);
    });
  }
  next({ type: HTTP_ERROR, payload: { isError: true, ...errorData } });
  setTimeout(() => {
    next({ type: HTTP_ERROR, payload: {} });
  }, 3000);
};

const executeApiCall = async (action: any, apiHandler: any, next: any) => {
  next({ type: HTTP_REQUEST, payload: { action, inProgress: true } });

  try {
    const response = await apiHandler.fetchCall(action);
    const responseData = apiHandler.postOp(await response.json());

    if (response.ok && response.status === 200) {
      handleSuccess(responseData, apiHandler.onSuccess, next);
    } else {
      handleError(response, apiHandler.onError, next);
    }
  } catch (error) {
    console.error(error);
    next({ type: HTTP_ERROR, payload: {} });
  } finally {
    next({ type: HTTP_REQUEST, payload: { action, inProgress: false } });
  }
};

export const myMiddleware: Middleware =
  (storeAPI) => (next) => async (action) => {
    const apiHandler = getApiRegistry(action.type);
    if (apiHandler === null) {
      return next(action);
    }

    await executeApiCall(action, apiHandler, next);
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
