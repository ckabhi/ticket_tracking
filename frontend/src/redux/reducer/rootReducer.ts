import { customCombineReducer } from "../../core/custom/customCombineReducer";
import account from "./account/accountReducer";
import todo from "./todos/todos.reducer";

export const rootReducer = customCombineReducer({
  account,
  todo,
});
