import { createReducer } from "../../../core/reducer/baseReducer";
import {
  REDIRECT_REQUEST,
  CLEAR_REDIRECT_REQUEST,
} from "../../actionType/actionType";
import {
  RedirectActionInterface,
  ClearRedirectInterface,
} from "../../../ts/interfaces/utility.interface";

const redirectReducer = {
  [REDIRECT_REQUEST]: (state: any = {}, action: RedirectActionInterface) => {
    return {
      ...state,
      path: action.payload.path,
      params: action.payload?.params,
      replace: action.payload?.replace || false,
    };
  },
  [CLEAR_REDIRECT_REQUEST]: (
    state: any = {},
    action: ClearRedirectInterface
  ) => {
    return {};
  },
};

export default createReducer({ redirectReducer: redirectReducer });
