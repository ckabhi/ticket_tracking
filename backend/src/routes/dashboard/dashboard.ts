import { Router, Request, Response } from "express";
const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  throw new Error("");

  res.status(200).json({
    msg: "dashboard is working",
  });
});
