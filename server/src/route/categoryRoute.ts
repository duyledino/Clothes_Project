import type { Express } from "express";
import express from "express";
import route from "./botRoute.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createACategory, getAllCategory,getACategory,updateACategory } from "../controller/category/controller.js";

const router = express.Router();

const initROute = (app: Express) => {
  router.get("/getAllCategory", asyncHandler(getAllCategory));
  router.post("/createACategory", asyncHandler(createACategory));
  router.get("/getACategory", asyncHandler(getACategory));
  router.put("/updateACategory", asyncHandler(updateACategory));
  return app.use("/api/v1/category", router);
};

export default initROute;