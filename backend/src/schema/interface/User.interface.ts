import { AuthLog } from "./AuthLog.interface";

export interface User {
  name: string;
  email: string;
  password: string;
  authLog?: AuthLog;
}
