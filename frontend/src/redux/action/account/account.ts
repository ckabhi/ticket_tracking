import { USER_LOGIN, USER_LOGOUT } from "../../actionType/actionType";

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
