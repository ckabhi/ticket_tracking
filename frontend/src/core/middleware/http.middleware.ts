import { Middleware } from "@reduxjs/toolkit";
import { getApiRegistry } from "../api/apiRegistry";
import { HTTP_ERROR, HTTP_REQUEST } from "../actionType/coreActionType";

export const myMiddleware: Middleware =
  (storeAPI) => (next) => async (action) => {
    const apiHandler = getApiRegistry(action.type);
    if (apiHandler === null) {
      // Not an api call and moving to next middleware
      return next(action);
    }

    const { fetchCall, onSuccess, onError, postOp } = apiHandler;
    try {
      next(action);
      // Set http request status to true
      next({ type: HTTP_REQUEST, payload: { action, inProgress: true } });

      const response = await fetchCall(action);
      const responseData = postOp(await response.json());

      // Execute success handler
      if (response.ok && response.status === 200) {
        const OnSuccessHandler = onSuccess(responseData);
        if (Array.isArray(OnSuccessHandler)) {
          OnSuccessHandler.forEach((act) => {
            next(act);
          });

          // Set http request status to false
          next({ type: HTTP_REQUEST, payload: { action, inProgress: false } });
        }
      } else {
        // Execute error handler
        const errorData = {
          errorCode: response.status,
          errorMessage: Object.keys(responseData).length ? responseData : "",
        };
        const OnErrorHandler = onError(errorData);
        if (Array.isArray(OnErrorHandler)) {
          OnErrorHandler.forEach((err) => {
            next(err);
          });
        }

        // Set http request status to false
        next({ type: HTTP_REQUEST, payload: { action, inProgress: false } });

        // set httpError
        next({ type: HTTP_ERROR, payload: { isError: true, ...errorData } });
        setTimeout(() => {
          next({ type: HTTP_ERROR, payload: {} });
        }, 3000);
      }
    } catch (error) {
      console.error("error");
      return next(action);
    }
    return;
  };
