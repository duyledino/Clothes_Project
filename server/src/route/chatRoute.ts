import express, { type Application } from "express";
import {
  // createChat,
  createMessage,
  getAllMessageFromChat,
  getAllMessageFromChatId,
  getChatByUserAdmin,
  getChatByUserId,
} from "../controller/chat/controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

const route = (app: Application) => {
  //this route will get chat from a user
  router.get(
    "/getChatByUserId",
    asyncHandler(authenticateUser),
    asyncHandler(getChatByUserId)
  );
  // this route will create chat between admin and user
  // router.post(
  //   "/createChat",
  //   asyncHandler(authenticateUser),
  //   asyncHandler(createChat)
  // );
  // this route will create message
  router.post(
    "/createMessage",
    asyncHandler(authenticateUser),
    asyncHandler(createMessage)
  );
  router.get("/getAllMessageFromChatId",asyncHandler(authenticateUser),asyncHandler(getAllMessageFromChatId));
  router.get("/getMessage",asyncHandler(authenticateUser),asyncHandler(getAllMessageFromChat))
  router.get("/getChatByUserAdmin",asyncHandler(authenticateUser),asyncHandler(getChatByUserAdmin))
  return app.use("/api/v1/chat", router);
};

export default route;
