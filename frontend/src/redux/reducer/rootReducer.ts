import { customCombineReducer } from "../../core/custom/customCombineReducer";
import account from "./account/account.reducer";
import todo from "./todos/todos.reducer";
import utility from "./utility/utility.reducer";

export const rootReducer = customCombineReducer({
  account,
  todo,
  utility,
});
