import {
  REDIRECT_REQUEST,
  CLEAR_REDIRECT_REQUEST,
} from "../../actionType/actionType";
import { RedirectPayloadInterface } from "../../../ts/interfaces/utility.interface";

export const redirectTo = (payload: RedirectPayloadInterface) => {
  return {
    type: REDIRECT_REQUEST,
    payload: payload,
  };
};

export const clearRedirectTo = () => {
  return {
    type: CLEAR_REDIRECT_REQUEST,
    payload: {},
  };
};
