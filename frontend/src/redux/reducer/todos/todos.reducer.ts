import { createReducer } from "../../../core/reducer/baseReducer";
import {
  FETCH_TODO_DETAILS,
  FETCH_TODO_DETAILS_ERROR,
  NOT_API_CALL,
  SAVE_FETCHED_TODO_DETAILS,
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

export default createReducer({ todoDetailsReducer });
