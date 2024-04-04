import { USER_LOGIN } from "../../redux/actionType/actionType";
import { registerApiHandler } from "../../core/api/apiRegistry";
import { httpService } from "../../core/api/HttpClient";
import {
  userLogin,
  saveUserDetails,
} from "../../redux/action/account/account.action";
import { userLoginRoute } from "../routes";
import { SecureStorage } from "../../redux/store/store";
import { redirectTo } from "../../redux/action/utility/utility.action";
import pathConstant from "../../routes/pathConstant";

const userLoginRequest = (action: any) => {
  return httpService(
    {
      method: "POST",
      path: userLoginRoute,
      body: action?.payload,
    },
    false
  );
};

const onSuccess = (data: any) => [
  saveUserDetails(data),
  redirectTo({ path: pathConstant.HOME }),
];
const onError = (error: any) => [];

const execute = {
  fetchCall: userLoginRequest,
  onSuccess: onSuccess,
  onError: onError,
  postOp: (data: any) => {
    try {
      const result = data?.result;
      if (result) {
        SecureStorage.setAccessToken(result.accessToken);
        SecureStorage.setRefreshToken(result.refreshToken);
      }
      return data?.result;
    } catch (error) {
      return data?.result;
    }
  },
};
registerApiHandler(USER_LOGIN, execute);
