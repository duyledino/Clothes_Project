import express, { type Application } from "express";
import {
  banUser,
  createAUser,
  getAllUser,
  getAUser,
  loginUser,
  logoutUser,
  updateUser,
  updateUser_admin,
} from "../controller/user/controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middleware/authentication.js";

const router = express.Router();

const route = (app: Application) => {
  router.get("/allUsers", asyncHandler(getAllUser));
  router.get(
    "/getAUser",
    asyncHandler(authenticateUser),
    asyncHandler(getAUser)
  );
  router.post("/createAUser", asyncHandler(createAUser));
  router.post(
    "/logout",
    asyncHandler(authenticateUser),
    asyncHandler(logoutUser)
  );
  router.put(
    "/updateUser_admin",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(updateUser_admin)
  );
  router.put("/updateUser", asyncHandler(updateUser), asyncHandler(updateUser));
  router.put(
    "/banUser",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(banUser)
  );
  router.post("/login", asyncHandler(loginUser));
  return app.use("/api/v1/user", router);
};

export default route;
