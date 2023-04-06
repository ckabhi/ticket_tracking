import jwt, { Jwt, JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECREATE } from "../config/const";
import {
  BAD_REQUEST_ERROR,
  SERVER_ERROR,
  SUCCESS,
  UNAUTHORIZED_ERROR,
} from "../helper/HttpStatusCode.helper";
import { ResponseBuilder } from "../helper/response.helper";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined = req.headers.authorization;
    token = token?.split(" ")[1];

    if (!token)
      return res
        .status(UNAUTHORIZED_ERROR)
        .json(ResponseBuilder.errorResponse("missing authentication token"));

    const result = await jwt.verify(token, JWT_SECREATE);
    res.locals._user = result;
    next();
  } catch (error) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .json(
        ResponseBuilder.errorResponse("Invalid authentication token", error)
      );
  }
};

export const signToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, _id, email } = res.locals._user;

    if (!_id)
      return res.status(BAD_REQUEST_ERROR).json("user _id does not exist");

    const jwtToken = await jwt.sign(
      { _id: _id, name: name, email: email },
      JWT_SECREATE,
      {
        expiresIn: "30d",
      }
    );

    return res.status(SUCCESS).json(
      ResponseBuilder.successResponse({
        name: name,
        _id: _id,
        token: jwtToken,
      })
    );
  } catch (error) {
    return res
      .status(SERVER_ERROR)
      .json(ResponseBuilder.errorResponse("somthing went wrong", error));
  }
};
