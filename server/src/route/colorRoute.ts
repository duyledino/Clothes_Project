import type { Express } from "express";
import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  createAColor,
  getAllColor,
  getAColor,
  updateAColor,
  deleteAColor,
} from "../controller/color/controller.js";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middleware/authentication.js";

const router = express.Router();

const initColorRoute = (app: Express) => {
  router.get(
    "/getAllColor",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(getAllColor)
  );
  router.post(
    "/createAColor",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(createAColor)
  );
  router.get(
    "/getAColor",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(getAColor)
  );
  router.put(
    "/updateAColor",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(updateAColor)
  );
  router.delete(
    "/deleteAColor",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(deleteAColor)
  );
  return app.use("/api/v1/color", router);
};

export default initColorRoute;
