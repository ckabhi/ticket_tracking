import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Errback,
} from "express";

export const Logger = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.info(`Error ${error.message}`);
};
