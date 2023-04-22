import { HTTP_ERROR } from "../actionType/coreActionType";
import { HttpPayload } from "../interface/HttpInterface";

export const httpFetchError = (data: HttpPayload) => {
  return {
    type: HTTP_ERROR,
    payload: data,
  };
};
