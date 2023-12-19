import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "../reducer/rootReducer";
// import { userLogin } from "../action/account/account.action";
import { myMiddleware } from "../../core/middleware/http.middleware";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const SecureStorage = {
  setRefreshToken: (token: string) =>
    localStorage.setItem("refreshToken", JSON.stringify(encoder.encode(token))),
  getRefreshToken: () => {
    let token = localStorage.getItem("refreshToken");
    if (token === null) return token;
    let tn = new Uint8Array(JSON.parse(token));
    return decoder.decode(tn);
  },
  setAccessToken: (token: string) =>
    localStorage.setItem("accessToken", JSON.stringify(encoder.encode(token))),
  getAccessToken: () => {
    let token = localStorage.getItem("accessToken");
    if (token === null) return token;
    let tn = new Uint8Array(JSON.parse(token));
    return decoder.decode(tn);
  },
  removeToken: () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  },
};

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
