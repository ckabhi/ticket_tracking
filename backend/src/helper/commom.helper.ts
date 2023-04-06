import bcrypt from "bcrypt";
import { SALT_ROUND } from "../config/const";

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
