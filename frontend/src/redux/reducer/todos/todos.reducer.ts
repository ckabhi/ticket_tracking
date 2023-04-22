import { createReducer } from "../../../core/reducer/baseReducer";
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
  SaveTodoDetailsAction,
  TodoDetailsAction,
} from "../../../ts/interfaces/todo.interface";

const todoDetailsReducer = {
  [FETCH_TODO_DETAILS]: (state: any, action: TodoDetailsAction) => {
    return {
      ...state,
      fetchingTodoDetails: true,
    };
  },
  [SAVE_FETCHED_TODO_DETAILS]: (
    state: any = {},
    action: SaveTodoDetailsAction
  ) => {
    return {
      ...state,
      details: action.data,
      fetchingTodoDetails: false,
    };
  },
  [FETCH_TODO_DETAILS_ERROR]: (state: any = {}, action: any) => {
    return {
      ...state,
      fetchingTodoDetails: false,
      todoDetailsError: true,
      error: action.error,
    };
  },
  [NOT_API_CALL]: (state: any = {}, action: any) => {
    return {
      ...state,
      data: action.data,
    };
  },
};

const todoList = {
  [REQUEST_TODO_LIST]: (state: any = {}, action: any) => {
    return {
      ...state,
      fetchingTodoList: true,
    };
  },
  [SAVE_TODO_LIST]: (state: any = {}, action: any) => {
    return {
      ...state,
      fetchingTodoList: false,
      todoList: action.data,
    };
  },

  [ERROR_TODO_LIST]: (state: any = {}, action: any) => {
    return {
      ...state,
      fetchingTodoList: false,
      todoListError: true,
      error: action.error,
    };
  },
};

export default createReducer({ todoDetailsReducer, todoList });
