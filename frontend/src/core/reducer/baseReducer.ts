import { combineReducers } from "@reduxjs/toolkit";
import httpReducer from "./httpReducer";

interface reducerRegistryType {
  [index: string]: boolean;
}

interface reducerObjectType {
  [index: string]: reducerHandler;
}

interface reducerHandler {
  [index: string]: (state: any, action: any) => any;
}
const reducerRegistry: reducerRegistryType = {};

function checkDuplicateReducer(actionType: string) {
  if (reducerRegistry[actionType]) return true;
  return false;
}

function addReducerToRegistry(actionType: string) {
  if (checkDuplicateReducer(actionType)) {
    console.error(`Duplicate reducer with action ${actionType}`);
    return false;
  }

  reducerRegistry[actionType] = true;
  return true;
}

function composeReducer(initialState: any = {}, handlers: reducerHandler) {
  return function (state = initialState, action: any) {
    const handler = handlers[action.type];
    if (handler) return handler(state, action);
    return state;
  };
}

export function createReducer(reducerObject: reducerObjectType) {
  let allHandlers = {};
  for (const elm of Object.keys(reducerObject)) {
    for (const key of Object.keys(reducerObject[elm])) {
      if (addReducerToRegistry(key)) {
        allHandlers = { ...allHandlers, ...reducerObject[elm] };
      }
    }
  }
  return composeReducer({}, allHandlers);
}
