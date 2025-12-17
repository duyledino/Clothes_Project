import express, { type Application } from "express";
import {
  getRevenue,
  bestCustomer,
  bestSeller,
} from "../controller/track/controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middleware/authentication.js";

const router = express.Router();

const init = (app: Application) => {
  router.get(
    "/revenue",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(getRevenue)
  );
  router.get(
    "/bestCustomer",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(bestCustomer)
  );
  router.get(
    "/bestSeller",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(bestSeller)
  );
  return app.use("/api/v1/track", router);
};

export default init;
