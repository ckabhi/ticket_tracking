import { REQUEST_ADD_TODO } from "../../redux/actionType/actionType";
import { registerApiHandler } from "../../core/api/apiRegistry";
import { httpService } from "../../core/api/HttpClient";
import { todos } from "../routes";
import { fetchTodoList } from "../../redux/action/todos/todos.action";

const addTodoRequest = (action: any) => {
  return httpService({
    method: "POST",
    path: todos,
    body: action.payload,
  });
};

const onSuccess = (data: any) => [fetchTodoList()];
const onError = (data: any) => [];

const execute = {
  fetchCall: addTodoRequest,
  onSuccess: onSuccess,
  onError: onError,
  postOp: (data: any) => {
    return data?.result;
  },
};

registerApiHandler(REQUEST_ADD_TODO, execute);
