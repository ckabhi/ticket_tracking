import { httpService } from "../../core/api/HttpClient";
import { registerApiHandler } from "../../core/api/apiRegistry";
import { saveUserDetails } from "../../redux/action/account/account.action";
import { USER_SIGNUP } from "../../redux/actionType/actionType";
import { SecureStorage } from "../../redux/store/store";
import { userSignupRoute } from "../routes";

const userSignupRequest = (action: any) => {
  return httpService(
    {
      method: "POST",
      path: userSignupRoute,
      body: action.payload,
    },
    false
  );
};

const onSuccess = (data: any) => [saveUserDetails(data)];
const onError = (data: any) => [];

const execute = {
  fetchCall: userSignupRequest,
  onSuccess: onSuccess,
  onError: onError,
  postOp: (data: any) => {
    try {
      const result = data?.result;
      if (data?.success && result) {
        SecureStorage.setAccessToken(result.accessToken);
        SecureStorage.setRefreshToken(result.refreshToken);
      }
      return data?.result;
    } catch (error) {
      return data.result;
    }
  },
};

registerApiHandler(USER_SIGNUP, execute);
