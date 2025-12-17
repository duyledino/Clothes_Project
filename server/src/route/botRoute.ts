import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authenticateUser } from "../middleware/authentication.js";
import type { Application } from "express";
import { getText } from "../controller/bot/controller.js";

const router = express.Router();

const route = (app: Application) => {
  //get bot's response
  router.post("/getBotResponse", asyncHandler(getText));
  return app.use("/api/v1/bot", router);
};

export default route;
