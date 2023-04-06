import { Request, Response, NextFunction } from "express";
import {
  isDuplicate,
  createAccount,
  updateProfileData,
  validatePassword,
  updateAccountPassword,
  validateUser,
  getUserByEmail,
  getUserById,
} from "../model/account.model";
import {
  SUCCESS,
  CONFLICT_ERROR,
  SERVER_ERROR,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
} from "../helper/HttpStatusCode.helper";
import { ResponseBuilder } from "../helper/response.helper";

export const checkDuplicate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const isAccountExist: boolean = await isDuplicate(email);

  if (isAccountExist)
    return res
      .status(CONFLICT_ERROR)
      .json(ResponseBuilder.errorResponse("Account Exist with this email"));
  next();
};

export const registerAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createAccount(req.body);

    if (result._id) {
      res.locals._user = result;
      next();
    }
  } catch (error) {
    return res
      .status(SERVER_ERROR)
      .json(ResponseBuilder.errorResponse("failed to create account"));
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (name && name.trim() !== "") {
      const result = await updateProfileData(res.locals._user._id, name);
      return res.status(SUCCESS).json(ResponseBuilder.successResponse(result));
    }
    return res
      .status(BAD_REQUEST_ERROR)
      .json(ResponseBuilder.errorResponse("missing name field"));
  } catch (error) {
    return res
      .status(BAD_REQUEST_ERROR)
      .json(ResponseBuilder.errorResponse("Somthing went wrong", error));
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (oldPassword.trim() == "" || newPassword.trim() == "")
      return res
        .status(BAD_REQUEST_ERROR)
        .json(ResponseBuilder.errorResponse("some field is missing"));

    if (await validatePassword(res.locals._user._id, oldPassword)) {
      const result = await updateAccountPassword(
        res.locals._user._id,
        newPassword
      );
      console.log("updated", result);
      if (result?._id) {
        res
          .status(SUCCESS)
          .json(
            ResponseBuilder.successResponse("Password updated successfully")
          );
      }
    }
    return res
      .status(BAD_REQUEST_ERROR)
      .json(ResponseBuilder.errorResponse("Incorrect password"));
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json(ResponseBuilder.errorResponse("somthing went wrong", error));
  }
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!password || !email || email.trim() == "")
      return res
        .status(BAD_REQUEST_ERROR)
        .json(ResponseBuilder.errorResponse("Email and Password is required"));

    if (!(await validateUser(email, password))) {
      return res
        .status(UNAUTHORIZED_ERROR)
        .json(ResponseBuilder.errorResponse("email or password is incorrect"));
    }

    const user = await getUserByEmail(email);
    res.locals._user = user;
    next();
  } catch (error) {
    return res
      .status(SERVER_ERROR)
      .json(ResponseBuilder.errorResponse("Somthing went wrong, try again"));
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const result = await getUserById(res.locals._user._id);

    if (result?.id) {
      return res.status(SUCCESS).json(
        ResponseBuilder.successResponse({
          _id: result._id,
          name: result.name,
          email: result.email,
        })
      );
    }

    throw new Error("failed to find account details");
  } catch (error) {
    return res
      .status(SERVER_ERROR)
      .json(ResponseBuilder.errorResponse("somthing went wrong, try again"));
  }
};
