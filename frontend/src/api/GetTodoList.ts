import { REQUEST_TODO_LIST } from "../redux/actionType/actionType";
import {
  saveTodoList,
  errorTodoList,
} from "../redux/action/todos/todos.action";
import { registerApiHandler } from "../core/api/apiRegistry";
import { httpRegister } from "../core/api/HttpClient";
import { getTodos } from "./routes";

const fetchTodoList = (action: any) => {
  return httpRegister("GET", getTodos, action?.query);
};
const onSuccess = (data: any) => [saveTodoList(data)];
const onError = (error: any) => [errorTodoList(error)];

const execute = {
  fetchCall: fetchTodoList,
  onSuccess: onSuccess,
  onError: onError,
  postOp: (data: any) => {
    return data;
  },
};
registerApiHandler(REQUEST_TODO_LIST, execute);
