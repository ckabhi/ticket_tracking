import { createReducer } from "./baseReducer";
import { HTTP_ERROR, HTTP_REQUEST } from "../actionType/coreActionType";
import { HttpRequestStatus } from "../interface/HttpAction.interface";
import { HttpRequestActionReturnData } from "../interface/HttpAction.interface";

const default_state: HttpRequestStatus = {};

const httpError = {
  [HTTP_ERROR]: (state: any = default_state, action: any) => {
    const { payload } = action;
    return {
      ...state,
    };
    return {
      httpError: payload?.isError || false,
      errorCode: payload?.errorCode || null,
      errorMessage: payload?.errorMessage || null,
    };
  },
};

const httpRequest = {
  [HTTP_REQUEST]: (
    state: HttpRequestStatus = default_state,
    action: HttpRequestActionReturnData
  ) => {
    const { payload } = action;
    const data = {
      [payload.action.type]: {
        status: payload.status,
        statusCode: payload?.statusCode,
        errorMessage: payload?.errorMessage,
      },
    };
    return {
      ...state,
      ...data,
    };
  },
};

export default createReducer({ httpError, httpRequest });
