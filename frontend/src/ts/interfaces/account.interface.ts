export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ISignupPayload extends ILoginPayload {
  name: string;
}

export interface IAuthFormState extends ISignupPayload {}
