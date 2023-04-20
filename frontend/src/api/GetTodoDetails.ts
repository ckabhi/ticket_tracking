import { FETCH_TODO_DETAILS } from "../redux/actionType/actionType";
import {
  saveFetchedTodoDetails,
  fetchTodoDetailsError,
} from "../redux/action/todos/todos.action";
import { registerApiHandler } from "../core/api/apiRegistry";
import { httpRegister } from "../core/api/HttpClient";
import { getTodoDetails } from "./routes";

const fetchTodoDetails = (action: any) => {
  return httpRegister("GET", getTodoDetails, action?.query);
};
const onSuccess = (data: any) => [saveFetchedTodoDetails(data)];
const onError = (error: any) => [fetchTodoDetailsError(error)];

const execute = {
  fetchCall: fetchTodoDetails,
  onSuccess: onSuccess,
  onError: onError,
  postOp: (data: any) => {
    return data;
  },
};
registerApiHandler(FETCH_TODO_DETAILS, execute);
