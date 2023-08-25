import { AuthLog } from "./AuthLog.interface";
import { AuthData } from "./AuthData.interface";

export interface User {
  name: string;
  email: string;
  password: string;
  authLog?: AuthLog;
  authData: Array<AuthData>;
}
