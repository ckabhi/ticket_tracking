import { Schema, model } from "mongoose";
import { User } from "./interface/User.interface";
import { AuthLog } from "./interface/AuthLog.interface";
import { AuthData } from "./interface/AuthData.interface";

export const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    authLog: {
      type: new Schema<AuthLog>({
        platform: { type: String },
        createdAt: { type: String },
        status: { type: String, required: true },
      }),
    },
    authData: Array<AuthData>,
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>("User", userSchema);
