import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer/rootReducer";
import { userLogin } from "./action/account/account";

const configureAppStore = (initialState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};

const storeInstance = configureAppStore();
storeInstance.subscribe(() => {
  console.log("stateData >>", storeInstance.getState());
});
storeInstance.dispatch(
  userLogin({ token: "XVyuTY789", session: "123udhud899" })
);

export default storeInstance;
