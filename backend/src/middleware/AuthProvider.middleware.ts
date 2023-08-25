import { Request, Response, NextFunction } from "express";
import {
  BAD_REQUEST_ERROR,
  SERVER_ERROR,
  SUCCESS,
  UNAUTHORIZED_ERROR,
} from "../helper/HttpStatusCode.helper";
import { ResponseBuilder } from "../helper/response.helper";
import { signJwtToken, verifyJwtToken } from "../helper/commom.helper";
import { AuthData } from "../schema/interface/AuthData.interface";
import {
  inValidateRefreshToken,
  insertAuthData,
  validateRefreshToken,
} from "../model/account.model";
import { ACCESS_TOKEN_VALIDITY, REFRESH_TOKEN_VALIDITY } from "../config/const";

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

    const result = await verifyJwtToken(token);
    res.locals._user = result;
    res.locals._token = token;
    next();
  } catch (error) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .json(
        ResponseBuilder.errorResponse("Invalid authentication token", error)
      );
  }
};

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, _id, email } = res.locals._user;
    const ip = req.connection.remoteAddress || "";
    const refreshToken = await signJwtToken(
      { name, _id, email, type: "refresh", access: "*" },
      REFRESH_TOKEN_VALIDITY
    );
    const accessToken = await signJwtToken(
      { name, _id, email, type: "access", access: "*" },
      ACCESS_TOKEN_VALIDITY
    );
    const authData: AuthData = {
      refreshToken: refreshToken,
      isActive: true,
      IPAddress: ip,
    };

    // insert refresh Token in database
    await insertAuthData(authData, _id);

    // res.setHeader(
    //   "Set-Cookie",
    //   `Bearer=${accessToken}; Domain=.app.localhost; Max-Age=300; Path=/; SameSite=None; HttpOnly`
    // );
    return res.status(SUCCESS).json(
      ResponseBuilder.successResponse({
        name: name,
        email: email,
        refreshToken: refreshToken,
        accessToken: accessToken,
      })
    );
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json(ResponseBuilder.errorResponse("somthing went wrong", error));
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, _id, email, type, access } = res.locals._user;
    const ip = req.connection.remoteAddress || "";
    if (type === "refresh") {
      if (!(await validateRefreshToken(_id, res.locals._token))) {
        await inValidateRefreshToken(_id, "all");

        return res
          .status(UNAUTHORIZED_ERROR)
          .json(
            ResponseBuilder.errorResponse("Invalid authentication token", "")
          );
      }

      await inValidateRefreshToken(_id, "one", res.locals._token);
      const refreshToken = await signJwtToken(
        { _id, name, email, type, access },
        REFRESH_TOKEN_VALIDITY
      );
      const accessToken = await signJwtToken(
        { _id, name, email, type, access },
        ACCESS_TOKEN_VALIDITY
      );
      const authData: AuthData = {
        refreshToken: refreshToken,
        isActive: true,
        IPAddress: ip,
      };
      await insertAuthData(authData, _id);

      return res.status(SUCCESS).json(
        ResponseBuilder.successResponse({
          refreshToken: refreshToken,
          accessToken: accessToken,
        })
      );
    }
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json(ResponseBuilder.errorResponse("somthing went wrong", error));
  }
};
