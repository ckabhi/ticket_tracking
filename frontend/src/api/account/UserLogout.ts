import { httpService } from "../../core/api/HttpClient";
import { registerApiHandler } from "../../core/api/apiRegistry";
import { USER_LOGOUT } from "../../redux/actionType/actionType";
import { SecureStorage } from "../../redux/store/store";
import { userLogout as userLogoutRoutes } from "../routes";
import { userLogout } from "../../redux/action/account/account.action";

const userLogoutRequest = (action: any) => {
  return httpService(
    {
      method: "POST",
      path: userLogoutRoutes,
    },
    true
  );
};

const onSuccess = (data: any) => [userLogout(data)];
const onError = (error: any) => [];

const execute = {
  fetchCall: userLogoutRequest,
  onSuccess: onSuccess,
  onError: onError,
  postOp: (data: any) => {
    SecureStorage.removeToken();
  },
};

registerApiHandler(USER_LOGOUT, execute);
