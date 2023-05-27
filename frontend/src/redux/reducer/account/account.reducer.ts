import { createReducer } from "../../../core/reducer/baseReducer";
import {
  SAVE_USER_DETAILS,
  USER_LOGIN,
  USER_LOGOUT,
} from "../../actionType/actionType";

const accountReducer = {
  [USER_LOGIN]: (state: any, action: any) => {
    const { payload } = action;
    return {
      ...state,
      isLogin: true,
      isLogedIn: false,
      token: null,
      userDetails: {},
    };
  },
  [USER_LOGOUT]: (state: any, action: any) => {
    const { payload } = action;
    return {
      ...state,
      isLogin: false,
      isLogedIn: false,
      token: null,
      userDetails: {},
    };
  },
  [SAVE_USER_DETAILS]: (state: any, action: any) => {
    const { data } = action;
    return {
      ...state,
      isLogin: false,
      isLogedIn: true,
      token: data.token,
      userDetails: {
        name: data.name,
        email: data.email,
      },
    };
  },
};

export default createReducer({ accountReducer });
