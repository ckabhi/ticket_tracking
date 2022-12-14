import express, { Express, Request, Response } from "express";
import bodyparser, { BodyParser } from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();

// app.use(bodyparser);

export default app;
