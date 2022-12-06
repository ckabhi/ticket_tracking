import { createReducer } from "../../../core/reducer/baseReducer";
import { USER_LOGIN, USER_LOGOUT } from "../../actionType/actionType";

const accountReducer = {
  [USER_LOGIN]: (state: any, action: any) => {
    const { payload } = action;
    return {
      ...state,
      isLogedIn: true,
      token: payload.token,
      session: payload.session,
    };
  },
  [USER_LOGOUT]: (state: any, action: any) => {
    const { payload } = action;
    return {
      ...state,
      isLogedIn: false,
      token: null,
      session: null,
    };
  },
};

export default createReducer({ accountReducer });
