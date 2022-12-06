import { customCombineReducer } from "../../core/custom/customeCombineReducer";
import account from "./account/accountReducer";

export const rootReducer = customCombineReducer({
  account,
});
