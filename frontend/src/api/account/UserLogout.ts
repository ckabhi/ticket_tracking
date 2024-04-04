import { httpService } from "../../core/api/HttpClient";
import { registerApiHandler } from "../../core/api/apiRegistry";
import { USER_LOGOUT } from "../../redux/actionType/actionType";
import { SecureStorage } from "../../redux/store/store";
import { userLogout as userLogoutRoutes } from "../routes";
import { userLogout } from "../../redux/action/account/account.action";
import { redirectTo } from "../../redux/action/utility/utility.action";
import pathConstant from "../../routes/pathConstant";

const userLogoutRequest = (action: any) => {
  return httpService(
    {
      method: "POST",
      path: userLogoutRoutes,
    },
    true
  );
};

const onSuccess = (data: any) => [
  userLogout(data),
  redirectTo({ path: pathConstant.LOGIN, replace: true }),
];
const onError = (error: any) => [
  redirectTo({ path: pathConstant.LOGIN, replace: true }),
];

const execute = {
  fetchCall: userLogoutRequest,
  onSuccess: onSuccess,
  onError: onError,
  postOp: (data: any) => {
    SecureStorage.removeToken();
  },
};

registerApiHandler(USER_LOGOUT, execute);
