import type { Express } from "express";
import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createAProvider, getAllProvider, getAProvider, updateAProvider } from "../controller/provider/controller.js";
import { authenticateAdmin, authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

const initProviderRoute = (app: Express) => {
  router.get("/getAllProvider", asyncHandler(authenticateUser), asyncHandler(authenticateAdmin), asyncHandler(getAllProvider));
  router.post("/createAProvider", asyncHandler(authenticateUser), asyncHandler(authenticateAdmin), asyncHandler(createAProvider));
  router.get("/getAProvider", asyncHandler(authenticateUser), asyncHandler(authenticateAdmin), asyncHandler(getAProvider));
  router.put("/updateAProvider", asyncHandler(authenticateUser), asyncHandler(authenticateAdmin), asyncHandler(updateAProvider));
  
  return app.use("/api/v1/provider", router);
};

export default initProviderRoute;