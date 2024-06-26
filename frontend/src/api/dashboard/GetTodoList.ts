import { REQUEST_TODO_LIST } from "../../redux/actionType/actionType";
import {
  saveTodoList,
  errorTodoList,
} from "../../redux/action/todos/todos.action";
import { registerApiHandler } from "../../core/api/apiRegistry";
import { httpService } from "../../core/api/HttpClient";
import { todos } from "../routes";

const fetchTodoList = (action: any) => {
  return httpService({
    method: "GET",
    path: todos,
    routeParameters: action?.query,
  });
};
const onSuccess = (data: any) => [saveTodoList(data)];
const onError = (error: any) => [errorTodoList(error)];

const execute = {
  fetchCall: fetchTodoList,
  onSuccess: onSuccess,
  onError: onError,
  postOp: (data: any) => {
    return data?.result;
  },
};
registerApiHandler(REQUEST_TODO_LIST, execute);
