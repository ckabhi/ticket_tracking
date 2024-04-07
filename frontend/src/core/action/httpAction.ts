import { HTTP_ERROR, HTTP_REQUEST } from "../actionType/coreActionType";
import {
  HttpRequestActionReturnData,
  HttpRequestStatusPayload,
} from "../interface/HttpAction.interface";

export const httpFetchError = (data: any) => {
  return {
    type: HTTP_ERROR,
    payload: data,
  };
};

export const httpRequest = (
  data: HttpRequestStatusPayload
): HttpRequestActionReturnData => {
  return {
    type: HTTP_REQUEST,
    payload: data,
  };
};
