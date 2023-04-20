import { ApiRegistryType, OptionsType } from "../interface/HttpInterface";

let API_REGISTRY: ApiRegistryType = {};

export const registerApiHandler = (
  actionType: string,
  options: OptionsType
) => {
  if (Object.hasOwn(API_REGISTRY, actionType)) {
    console.error(`An Api is already register with name ${actionType}`);
    return;
  }
  API_REGISTRY[actionType] = options;
};

export const getApiRegistry = (actionType: string) => {
  if (Object.hasOwn(API_REGISTRY, actionType)) return API_REGISTRY[actionType];
  return null;
};
