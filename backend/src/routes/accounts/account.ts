import { Router, Request, Response, NextFunction } from "express";
import {
  authentication,
  refreshAccessToken,
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

route.post("/create", checkDuplicate, registerAccount, authentication);

route.post("/login", authenticateUser, authentication);

route.put("/profile", verifyToken, updateProfile);

route.get("/profile", verifyToken, getProfile);

route.put("/password", verifyToken, updatePassword);

route.post("/refresh", verifyToken, refreshAccessToken);

export default route;
