import { USER_LOGIN } from "../../redux/actionType/actionType";
import { registerApiHandler } from "../../core/api/apiRegistry";
import { httpService } from "../../core/api/HttpClient";
import {
  userLogin,
  saveUserDetails,
} from "../../redux/action/account/account.action";
import { userLoginRoute } from "../routes";

const userLoginRequest = (action: any) => {
  return httpService({
    method: "POST",
    path: userLoginRoute,
    body: action?.payload,
  });
};

const onSuccess = (data: any) => [saveUserDetails(data)];
const onError = (error: any) => [];

const execute = {
  fetchCall: userLoginRequest,
  onSuccess: onSuccess,
  onError: onError,
  postOp: (data: any) => {
    return data?.result;
  },
};
registerApiHandler(USER_LOGIN, execute);
