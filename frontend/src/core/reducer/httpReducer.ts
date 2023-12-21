import { createReducer } from "./baseReducer";
import { HTTP_ERROR, HTTP_REQUEST } from "../actionType/coreActionType";

const default_state = {
  httpError: false,
  errorCode: null,
  errorMessage: null,
};

const httpError = {
  [HTTP_ERROR]: (state: any = default_state, action: any) => {
    const { payload } = action;
    return {
      httpError: payload?.isError || false,
      errorCode: payload?.errorCode || null,
      errorMessage: payload?.errorMessage || null,
    };
  },
};

const httpRequest = {
  [HTTP_REQUEST]: (state: any, action: any) => {
    const { payload } = action;
    const data = { [payload.action.type]: payload.inProgress };
    return {
      ...state,
      ...data,
    };
  },
};

export default createReducer({ httpError, httpRequest });
