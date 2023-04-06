import { Router, Request, Response, NextFunction } from "express";
import {
  signToken,
  verifyToken,
} from "../../middleware/AuthProvider.middleware";
import {
  authenticateUser,
  checkDuplicate,
  getProfile,
  registerAccount,
  updatePassword,
  updateProfile,
} from "../../middleware/Account.middleware";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    msg: "Accoun is working from docker new",
    token: "",
  });
});

route.post("/create", checkDuplicate, registerAccount, signToken);

route.post("/login", authenticateUser, signToken);

route.put("/profile", verifyToken, updateProfile);

route.get("/profile", verifyToken, getProfile);

route.put("/password", verifyToken, updatePassword);

export default route;
