import { HTTP_ERROR } from "../actionType/coreActionType";

interface errorData {
  errorCode: number;
  errorMessage: string;
  other?: any;
}
export const httpFetchError = (data: errorData) => {
  return {
    type: HTTP_ERROR,
    payload: data,
  };
};
