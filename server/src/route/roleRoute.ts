import type { Express } from "express";
import express from "express";
import route from "./botRoute.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createARole, deleteARole, getAllRole, getARole, updateARole } from "../controller/role/controller.js";
import { authenticateAdmin, authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

const initROute = (app: Express) => {
  router.get("/getAllRole",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin) ,asyncHandler(getAllRole));
  router.post("/createARole", asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(createARole));
  router.get("/getARole",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin) ,asyncHandler(getARole));
  router.put("/updateARole",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin) ,asyncHandler(updateARole));
  router.delete("/deleteARole",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(deleteARole));
  return app.use("/api/v1/role", router);
};

export default initROute;