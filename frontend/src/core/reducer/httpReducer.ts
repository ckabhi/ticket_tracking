import { createReducer } from "./baseReducer";
import { HTTP_ERROR } from "../actionType/coreActionType";

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

export default createReducer({ httpError });
