import httpReducer from "../reducer/httpReducer";
import { combineReducers } from "@reduxjs/toolkit";

export const customCombineReducer = (reducer: object) => {
  reducer = { ...reducer, httpReducer };
  return combineReducers(reducer);
};
