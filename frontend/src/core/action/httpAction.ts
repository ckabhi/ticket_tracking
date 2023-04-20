import { HTTP_ERROR, HTTP_FETCH } from "../actionType/coreActionType";
import { HttpPayload } from "../interface/HttpInterface";

export const httpFetchError = (data: HttpPayload) => {
  return {
    type: HTTP_ERROR,
    payload: data,
  };
};

export const httpFetchRequest = (data: HttpPayload) => {
  return {
    type: HTTP_FETCH,
    payload: data,
  };
};
