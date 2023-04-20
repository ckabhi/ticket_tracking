import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "../reducer/rootReducer";
import { userLogin } from "../action/account/account";
import { myMiddleware } from "../../core/middleware/http.middleware";

const configureAppStore = (initialState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [myMiddleware, ...getDefaultMiddleware()],
  });

  return store;
};

const storeInstance = configureAppStore();
storeInstance.subscribe(() => {
  console.log("Store Data", storeInstance.getState());
});

export default storeInstance;
