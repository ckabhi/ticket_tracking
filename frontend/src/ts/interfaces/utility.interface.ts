export interface RedirectPayloadInterface {
  path: string;
  params?: Record<string, any>;
  replace?: boolean;
}

export interface RedirectActionInterface {
  type: string;
  payload: RedirectPayloadInterface;
}
export interface ClearRedirectInterface {
  type: string;
  payload: {};
}
