import { Middleware } from "@reduxjs/toolkit";
import { getApiRegistry } from "../api/apiRegistry";
import { HTTP_ERROR } from "../actionType/coreActionType";

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
      const response = await fetchCall(action);
      const responseData = postOp(await response.json());

      // Execute success handler
      if (response.ok && response.status === 200) {
        const OnSuccessHandler = onSuccess(responseData);
        if (Array.isArray(OnSuccessHandler)) {
          OnSuccessHandler.forEach((act) => {
            next(act);
          });
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

        // set httpError
        next({ type: HTTP_ERROR, payload: { isError: true, ...errorData } });
        setTimeout(() => {
          next({ type: HTTP_ERROR, payload: {} });
        }, 3000);
      }
    } catch (error) {
      return next(action);
    }
    return;
  };
