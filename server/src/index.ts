import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import cookie_parser from "cookie-parser";
import "dotenv/config";
import bot from "./route/botRoute.js";
import user from "./route/userRoute.js";
import order from "./route/orderRoute.js";
import product from "./route/productRoute.js";
import payment from "./route/paymentRoute.js";
import cart from "./route/cartRoute.js";
import tryon from "./route/tryonRoute.js";
import track from "./route/trackRoute.js";
import review from "./route/reviewRoute.js";
import chat from "./route/chatRoute.js";
import stock from "./route/stockReceiptRoute.js";
import inventory from "./route/inventoryRoute.js";
import role from "./route/roleRoute.js";
import color from "./route/colorRoute.js";
import size from "./route/sizeRoute.js";
import provider from "./route/providerRoute.js";
import category from "./route/categoryRoute.js";
import test from "./route/testRoute.js";

import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { puter } from "./config/puter.js";
import { responseAI, saveMessage } from "./controller/chat/controller.js";

const app = express();
app.use(express.json());
app.use(cookie_parser());
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"], // Specify headers explicitly
    credentials: true, // Optional: if I use cookies or auth headers
    origin: `${process.env.client_Url}`,
  })
);
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD");
});

user(app);
order(app);
payment(app);
cart(app);
product(app);
tryon(app);
track(app);
review(app);
chat(app);
bot(app);
inventory(app);
stock(app);
role(app);
color(app);
size(app);
provider(app);
category(app);
test(app);

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});

const io = new Server(3501, {
  cors: {
    origin: `${process.env.client_Url}`,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const prisma = new PrismaClient();
io.on("connection", async (socket) => {
  console.log("✅ Client connected. 1 User is connected");
  socket.on("typing", (data) => {
    if (!data) return;

    try {
      const parsedData = JSON.parse(data);
      const { chat_id, user_id, isTyping } = parsedData;
      
      console.log(`Typing status: ${isTyping} from ${user_id} in ${chat_id}`);

      socket.to(chat_id).emit("typing", JSON.stringify({ 
        chat_id, 
        user_id, 
        isTyping 
      }));

    } catch (error) {
      console.log("❌ Error parsing typing data:", error);
      socket.emit("message",JSON.stringify("Lỗi hệ thống !! "+error))
    }
  });
  socket.on("register", async (data) => {
    const parsedData: {
      from_id: string;
      chat_id: string;
      to_id: string;
    } = JSON.parse(data as any);
    socket.join(parsedData.chat_id);
    try {
      const is_admin_online = await prisma.user.findFirst({
        select: {
          user_id: true,
          role: {
            select: {
              role_name: true,
            },
          },
        },
        where: {
          user_id: parsedData.from_id,
        },
      });
      socket.data.isAdminOnline = is_admin_online?.role?.role_name === "admin";
      socket
        .to(parsedData.chat_id)
        .emit("register", JSON.stringify(parsedData));
      // if(socket.data.isAdminOnline){
      //   socket.to(parsedData.chat_id).emit("register",{
      //     message:"admin online",
      //     from_id:parsedData.from_id,
      //     chat_id:parsedData.chat_id,
      //     to_id:parsedData.to_id
      //   });
      // }else{
      //   socket.to(parsedData.chat_id).emit("register",{
      //     message:"admin offline",
      //     from_id:parsedData.from_id,
      //     chat_id:parsedData.chat_id,
      //     to_id:parsedData.to_id
      //   });
      // }
    } catch (error) {
      console.log(error);
    }

    console.log("✅ Register for message: ", parsedData);
  });
  socket.on("message", async (data) => {
    const parseData: {
      message_id: string;
      chat_id: string;
      message: string;
      from_id: string;
    } = JSON.parse(data);
    console.log(
      "✅ Receive message from : ",
      parseData.from_id,
      "chat_id:",
      parseData.chat_id,
      "message:",
      parseData.message
    );
    // console.log("socket.data.isAdminOnline: ",socket.data.isAdminOnline);
    // check room không phải check người gửi !!!!
    // 2. CHECK THE ROOM: Who is currently in this chat?
    // fetchSockets() returns an array of all sockets in this room
    const socketsInRoom = await io.in(parseData.chat_id).fetchSockets();
    // console.log("socketsInRoom: ",socketsInRoom);
    // 3. Find if there is an Admin in the room
    // We look for a socket that is NOT the sender AND has isAdminOnline = true
    const adminIsOnline = socketsInRoom.some((remoteSocket) => {
      console.log(
        "remoteSocket.data.isAdminOnline: ",
        remoteSocket.data.isAdminOnline
      );
      return remoteSocket.data.isAdminOnline;
    });
    console.log("adminIsOnline: ", adminIsOnline);
    if (adminIsOnline) {
      socket.to(parseData.chat_id).emit(
        "message",
        JSON.stringify({
          message: parseData.message,
          from_id: parseData.from_id,
          chat_id: parseData.chat_id,
          message_id: parseData.message_id,
          isAdmin: true,
        })
      );
      const saveUserMessage = await saveMessage(
        parseData.message,
        parseData.chat_id,
        parseData.from_id
      );
      const saveAdminMessage = await saveMessage(
        parseData.message,
        parseData.chat_id,
        parseData.from_id
      );
    } else {
      try {
        socket.emit("typing",JSON.stringify({
          user_id:parseData.from_id,
          chat_id:parseData.chat_id,
          isTyping:true
        }));
        const message_ai = await responseAI(parseData.message);
        console.log("message_ai: ", message_ai);
        const admin = await prisma.user.findFirst({
          select: { user_id: true },
          where: { role: { role_name: "admin" } },
        });
        socket.emit("typing",JSON.stringify({
          user_id:parseData.from_id,
          chat_id:parseData.chat_id,
          isTyping:false
        }));
        socket.emit(
          "message",
          JSON.stringify({
            message: message_ai,
            from_id: "AI",
            chat_id: parseData.chat_id,
            message_id: parseData.message_id,
            isAdmin: false,
          })
        );

        const saveUserMessage = await saveMessage(
          parseData.message,
          parseData.chat_id,
          parseData.from_id
        );
        const saveAIMessage = await saveMessage(
          message_ai!.toString(),
          parseData.chat_id,
          admin!.user_id
        );
      } catch (error) {
        console.log(">>>>>>>>>.error: ", error);
      }
    }
  });
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});
