import { Router, Request, Response, NextFunction } from "express";
import { signToken } from "../../middleware/AuthProvider";
import { UserModel } from "../../schema/User.schema";
import { User } from "../../schema/interface/User.interface";
import { generateHash } from "../../helper/commom.helper";
import { ResponseBuilder } from "../../helper/response.helper";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  const tk = await signToken({ name: "foo" });
  res.status(200).json({
    msg: "Accoun is working from docker new",
    token: tk,
  });
});

route.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let body: User = req.body;
      const encryptedPassword = await generateHash(body.password);
      if (encryptedPassword != null) body.password = encryptedPassword;

      const user = new UserModel(body);
      const result = await user.save();
      console.log(result);
      res.locals._user = result;

      res.status(200).json(ResponseBuilder.successResponse(result));
    } catch (error) {
      console.error(error);
    }
  }
);

export default route;
