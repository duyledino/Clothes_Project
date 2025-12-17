import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import cookie_parser from 'cookie-parser';
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
import category from './route/categoryRoute.js';
import test from './route/testRoute.js';


import { WebSocketServer } from "ws";
import { broadcastToUser } from "./util/socket.js";
import { createMessageWebsoket } from "./controller/chat/controller.js";

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

const server = app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

const chats: Record<any, any> = {};

wss.on("connection", (ws) => {
  let user: { userId: string } | null = null;
  console.log("✅ Client connected. 1 User is connected");
  ws.on("error", (err) => {
    console.error("❌Failed to connect websocket:\n", err);
  });
  ws.on("message", async function (data) {
    const parsedData: {
      type: string;
      message: string;
      fromId: string;
      chatId: string;
      toId: string;
    } = JSON.parse(data as any);
    //register for the very first time
    if (parsedData.type === "register") {
      const { fromId } = parsedData;
      chats[fromId] = ws;
      console.log("✅ Register for message");
      return;
    }
    //this is toId
    const { message, chatId, fromId, toId } = parsedData;
    if (!chats[fromId]) chats[fromId] = ws;
    // if(!chats[toId]) chats[toId] = ws;
    console.log("received:", parsedData);
    user = { userId: fromId };
    try {
      //send to specific userId
      //dont need to use Set because this application doesn't support chat room
      // NOTE: nothing is gonna send for the very first time
      broadcastToUser(chats, chatId, toId, message);
      //NOTE: then save to database
      await createMessageWebsoket(parsedData);
    } catch (err) {
      console.error("❌ Error handling message:", err);
      ws.send(
        JSON.stringify({ error: "Invalid message format or server error." })
      );
    }
  });
  ws.on("close", () => {
    if (user && chats[user.userId]) {
      delete chats[user.userId];
      console.log(`❌ User ${user.userId} disconnected`);
    }
  });
});
