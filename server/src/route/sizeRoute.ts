import type { Express } from "express";
import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
// Changed import to size controller
import { createASize, deleteASize, getAllSize, getASize, updateASize } from "../controller/size/controller.js";
import { authenticateAdmin, authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

const initSizeRoute = (app: Express) => {
  router.get("/getAllSize",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin) ,asyncHandler(getAllSize));
  router.post("/createASize", asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(createASize));
  router.get("/getASize", asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(getASize));
  router.put("/updateASize", asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(updateASize));
  router.delete("/deleteASize",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(deleteASize));
  return app.use("/api/v1/size", router);
};

export default initSizeRoute;