import { HTTP_ERROR, HTTP_REQUEST } from "../actionType/coreActionType";
import { HttpPayload } from "../interface/HttpInterface";

export const httpFetchError = (data: HttpPayload) => {
  return {
    type: HTTP_ERROR,
    payload: data,
  };
};

export const httpRequest = (data: any) => {
  return {
    type: HTTP_REQUEST,
    payload: data,
  };
};
