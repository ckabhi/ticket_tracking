import {
  ERROR_TODO_LIST,
  FETCH_TODO_DETAILS,
  FETCH_TODO_DETAILS_ERROR,
  NOT_API_CALL,
  REQUEST_TODO_LIST,
  SAVE_FETCHED_TODO_DETAILS,
  SAVE_TODO_LIST,
} from "../../actionType/actionType";
import {
  TodoDetails,
  TodoDetailsPayload,
} from "../../../ts/interfaces/todo.interface";
import "../../../api/dashboard/GetTodoDetails";
import "../../../api/dashboard/GetTodoList";

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

export const fetchTodoList = (page = 1, limit = 10) => {
  return {
    type: REQUEST_TODO_LIST,
    query: { page, limit },
  };
};

export const saveTodoList = (data: any) => {
  return {
    type: SAVE_TODO_LIST,
    data,
  };
};

export const errorTodoList = (error: any) => {
  return {
    type: ERROR_TODO_LIST,
    error,
  };
};

export const notApiCall = (data: any) => {
  return {
    type: NOT_API_CALL,
    data: data,
  };
};
