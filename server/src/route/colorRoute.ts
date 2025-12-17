import type { Express } from "express";
import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
// Changed import to color controller
import { createAColor, getAllColor, getAColor, updateAColor } from "../controller/color/controller.js";
import { authenticateAdmin, authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

const initColorRoute = (app: Express) => {
  router.get("/getAllColor", asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(getAllColor));
  router.post("/createAColor",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin), asyncHandler(createAColor));
  router.get("/getAColor",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin) ,asyncHandler(getAColor));
  router.put("/updateAColor",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin) ,asyncHandler(updateAColor));
  
  // Updated base path from /role to /color
  return app.use("/api/v1/color", router);
};

export default initColorRoute;