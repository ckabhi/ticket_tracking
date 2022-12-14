import jwt, { Jwt, JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECREATE } from "../config/const";

export const varifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  // const result = await jwt.verify(req.headers.au,JWT_SECREATE)
};

export const signToken = async (payload: any) => {
  try {
    const jwtToken = await jwt.sign(
      { name: "abhishek", from: "server" },
      JWT_SECREATE,
      {
        algorithm: "RS256",
      }
    );
  } catch (error) {}
};
