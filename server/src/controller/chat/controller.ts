import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getChatByUserId = async (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };
  console.log("getChatByUserId: ", userId);
  const exists = await prisma.user.findFirst({
    where: {
      user_id: userId,
    },
  });
  if (!exists) return res.status(404).json({ Message: "User Not Found" });
  const chats = await prisma.chat_User.findMany({
    select: {
      chatId: true,
      fromUser: {
        select: {
          user_id: true,
          name: true,
          email: true,
        },
      },
      toUser: {
        select: {
          user_id: true,
          name: true,
          email: true,
        },
      },
    },
    where: {
      userIdFrom: userId,
    },
  });
  return res.status(200).json({
    chats: chats,
  });
};

const createChat = async (req: Request, res: Response) => {
  // this application only create chat for user (admin is ignore)
  const { userId } = req.query as { userId: string };
  //   const existsAdmin = await prisma.user.findFirst({
  //     where: {
  //       id: "4424ad66-3ab3-4b18-992a-b98ab5c7352f",
  //     },
  //   });
  console.log("chat/createChat: ", userId);
  const existsUser = await prisma.user.findFirst({
    where: {
      user_id: userId,
    },
  });
  if (!existsUser)
    return res.status(404).json({ Message: "Failed to create chat" });
  //create Chat in user
  const chat = await prisma.chat.create({
    data: {},
  });
  const adminUser = await prisma.user.findFirst({
    where: {
      role: {
        role_name: 'admin'
      },
    },
  });
  if (!adminUser) return res.status(500).json({ Message: "Admin not found." });
  //create Chat in admin
  await prisma.chat_User.create({
    data: {
      chatId: chat.chatId,
      //user
      userIdFrom: userId,
      //admin
      userIdTo: adminUser.user_id,
    },
  });

  await prisma.chat_User.create({
    data: {
      //admin
      userIdTo: userId,
      userIdFrom: adminUser.user_id,
      chatId: chat.chatId,
    },
  });
  return res.status(201).json({ Message: "" });
};

const createMessage = async (req: Request, res: Response) => {
  //get userId (send) and content from client
  const { userId, chatId } = req.query as {
    userId: string;
    chatId: string;
  };
  const { content } = req.body;
  const exists = await prisma.user.findFirst({
    where: {
      user_id: userId,
    },
  });
  if (!exists) return "User not found";
  await prisma.chat_Message.create({
    data: {
      chatId: chatId,
      userId: userId,
      content: content,
    },
  });
};

const createMessageWebsoket = async (data: {
  fromId: string;
  chatId: string;
  message: string;
}) => {
  //get userId (send) and content from client
  console.log("data: ", data);
  const { fromId, chatId } = data;
  const { message } = data;
  try {
    const exists = await prisma.user.findFirst({
      where: {
        user_id: fromId,
      },
    });
    if (!exists) return "User not found";
    await prisma.chat_Message.create({
      data: {
        chatId: chatId,
        userId: fromId,
        content: message,
      },
    });
    console.log("create successfully.");
  } catch (error) {
    console.log("error: ", error);
    console.log("Failed to create");
  }
};

const getAllMessageFromChat = async (req: Request, res: Response) => {
  const { chatId } = req.query as { chatId: string };
  if (chatId === "default")
    return res.status(400).json({ Message: "Failed to get message" });
  const exists = await prisma.chat.findFirst({
    where: {
      chatId: chatId,
    },
  });
  if (!exists) return res.status(404).json({ Message: "Chat Not Found" });
  const allMessage = await prisma.chat_Message.findMany({
    select: {
      chatId: true,
      content: true,
      userId: true,
      messageId: true,
    },
    where: {
      chatId: chatId,
    },
  });
  return res.status(200).json({ messages: allMessage });
};
export {
  createChat,
  createMessage,
  getChatByUserId,
  getAllMessageFromChat,
  createMessageWebsoket,
};
