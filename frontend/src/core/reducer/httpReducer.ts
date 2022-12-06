import { createReducer } from "./baseReducer";
import { HTTP_ERROR } from "../actionType/coreActionType";

const httpError = {
  [HTTP_ERROR]: (state: any, action: any) => {
    const { payload } = action;

    return {
      ...state,
      httpError: true,
      errorCode: payload.errorCode,
      errorMessage: payload.errorMessage,
    };
  },
};

export default createReducer({ httpError });
