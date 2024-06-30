import {
  ApiRegistryType,
  OptionsType,
} from "../interface/HttpRequest.interface";

let API_REGISTRY: ApiRegistryType = {};

export const registerApiHandler = (
  actionType: string,
  options: OptionsType
) => {
  if (Object.hasOwn(API_REGISTRY, actionType)) {
    console.warn(`An Api is already register with name ${actionType}`);
    // return;
  }
  API_REGISTRY[actionType] = options;
};

export const getApiRegistry = (actionType: string) => {
  if (Object.hasOwn(API_REGISTRY, actionType)) return API_REGISTRY[actionType];
  return null;
};

export const apiRegistryHas = (actionType: string) => {
  if (Object.hasOwn(API_REGISTRY, actionType)) return true;
  return false;
};
