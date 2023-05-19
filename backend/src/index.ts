import bodyparser, { BodyParser } from "body-parser";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import accountRoutes from "./routes/accounts/account";
import { Logger } from "./helper/logger";
import app from "./core/server";
import { ResponseBuilder } from "./helper/response.helper";
import dashboard from "./routes/dashboard/dashboard";

const port = process.env.PORT;
const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbLink = process.env.DB_LINK;

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// db connection

mongoose
  .set("strictQuery", false)
  .connect(
    `mongodb://${dbUserName}:${dbPassword}@${dbLink}:27017/todo?useNewUrlParser=true&useUnifiedTopology=true&authSource=admin`
  );

// mongoose.connect(
//   "mongodb://admin:password@localhost:27017/todo?useNewUrlParser=true&useUnifiedTopology=true&authSource=admin"
// );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "CONNECTION ERROR"));
db.once("open", () => {
  console.log("Connected to DB");
});

app.use("/account", accountRoutes);
app.use("/dashboard", dashboard);

// 404 routes

app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json(ResponseBuilder.generateResponse("error", "Routes not found"));
});

// Error Handler

app.listen(port, () => {
  console.log(`[${new Date()}]: Server is running at http://localhost:${port}`);
});
