import {
  FETCH_TODO_DETAILS,
  FETCH_TODO_DETAILS_ERROR,
  NOT_API_CALL,
  SAVE_FETCHED_TODO_DETAILS,
} from "../../actionType/actionType";
import {
  TodoDetails,
  TodoDetailsPayload,
} from "../../../ts/interfaces/todo.interface";
import "./../../../api/GetTodoDetails";

export const fetchTodoDetails = (payload: TodoDetailsPayload) => {
  return {
    type: FETCH_TODO_DETAILS,
    query: payload,
  };
};

export const saveFetchedTodoDetails = (data: TodoDetails) => {
  return {
    type: SAVE_FETCHED_TODO_DETAILS,
    data: data,
  };
};

export const fetchTodoDetailsError = (error: any) => {
  return {
    type: FETCH_TODO_DETAILS_ERROR,
    error,
  };
};

export const notApiCall = (data: any) => {
  return {
    type: NOT_API_CALL,
    data: data,
  };
};
