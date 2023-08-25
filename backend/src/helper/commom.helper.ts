import bcrypt from "bcrypt";
import { JWT_SECREATE, SALT_ROUND } from "../config/const";
import jwt, { Jwt } from "jsonwebtoken";

export const generateHash = async (password: string) => {
  try {
    const hash = await bcrypt.hash(password, SALT_ROUND);
    return hash;
  } catch (e) {
    return null;
  }
};

export const compareHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const signJwtToken = async (payload: Object, timeLimit: string) => {
  return await jwt.sign(payload, JWT_SECREATE, { expiresIn: timeLimit });
};

export const verifyJwtToken = async (token: string) => {
  return await jwt.verify(token, JWT_SECREATE);
};
