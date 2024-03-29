import {
  SAVE_USER_DETAILS,
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGNUP,
} from "../../actionType/actionType";
import "./../../../api/account/UserSignup";
import "./../../../api/account/UserLogin";
import "./../../../api/account/UserLogout";

export const userSignup = (data: any) => {
  return {
    type: USER_SIGNUP,
    payload: data,
  };
};

export const userLogin = (data: any) => {
  return {
    type: USER_LOGIN,
    payload: data,
  };
};

export const userLogout = (data: any) => {
  return {
    type: USER_LOGOUT,
    payload: data,
  };
};

export const saveUserDetails = (data: any) => {
  return {
    type: SAVE_USER_DETAILS,
    data: data,
  };
};
