import express, { type Express } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middleware/authentication.js";
import { getAllStockReceipt,createStockReceipt,getPrepareBeforeAdd } from "../controller/stock/controller.js";

const router = express.Router();

const initRoute = (app: Express) => {
  router.get(
    "/getAllStockReceipt",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(getAllStockReceipt)
  );
  router.post("/createStockReceipt",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(createStockReceipt));
  router.get("/getPrepareBeforeAdd",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(getPrepareBeforeAdd));
  return app.use("/api/v1/stockReceipt", router);
};

export default initRoute;
