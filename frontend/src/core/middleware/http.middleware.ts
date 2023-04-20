import { Middleware } from "@reduxjs/toolkit";
import { getApiRegistry } from "../api/apiRegistry";

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

      if (response.ok && response.status === 200) {
        const OnSuccessHandler = onSuccess(responseData);
        if (Array.isArray(OnSuccessHandler)) {
          OnSuccessHandler.forEach((act) => {
            next(act);
          });
        }
      } else {
        const errorData = {
          status: response.status,
          message: Object.keys(responseData).length ? responseData : "",
        };
        const OnErrorHandler = onError(errorData);
        if (Array.isArray(OnErrorHandler)) {
          OnErrorHandler.forEach((err) => {
            next(err);
          });
        }
      }
    } catch (error) {
      return next(action);
    }
    return;
  };
