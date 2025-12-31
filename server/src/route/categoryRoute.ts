import type { Express } from "express";
import express from "express";
import route from "./botRoute.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  createACategory,
  getAllCategory,
  getACategory,
  updateACategory,
  deleteACategory,
} from "../controller/category/controller.js";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middleware/authentication.js";

const router = express.Router();

const initROute = (app: Express) => {
  router.get(
    "/getAllCategory",
    asyncHandler(getAllCategory)
  );
  router.get(
    "/getAllCategoryAdmin",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(getAllCategory)
  );
  router.post(
    "/createACategory",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(createACategory)
  );
  router.get(
    "/getACategory",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(getACategory)
  );
  router.put(
    "/updateACategory",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(updateACategory)
  );
  router.delete(
    "/deleteACategory",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(deleteACategory)
  );
  return app.use("/api/v1/category", router);
};

export default initROute;
