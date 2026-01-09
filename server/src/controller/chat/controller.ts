import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { puter } from "../../config/puter.js";

const prisma = new PrismaClient();

const getChatByUserId = async (req: Request, res: Response) => {
  const { user_id } = req.query as { user_id: string };
  console.log("getChatByuser_id: >>>>>", user_id);
  const exists = await prisma.user.findFirst({
    where: {
      user_id: user_id,
    },
  });
  if (!exists) return res.status(404).json({ Message: "User Not Found" });
  const chats = await prisma.chat.findMany({
    select: {
      chat_id: true,
      user_id_admin: true,
      user_id_user: true,
      chat_admin: {
        select: {
          name: true,
        },
      },
      create_at: true,
    },
    where: {
      user_id_user: user_id,
    },
  });
  console.log(">>>>>>>chat: ",chats);
  return res.status(200).json({
    chats: chats,
  });
};

const getChatByUserAdmin = async (req: Request, res: Response) => {
  const { user_id } = req.query as { user_id: string };
  console.log("getChatByUserAdmin: ", user_id);
  const exists = await prisma.user.findFirst({
    where: {
      user_id: user_id,
    },
  });
  if (!exists) return res.status(404).json({ Message: "Không tìm thấy user" });
  const chats = await prisma.chat.findMany({
    select: {
      chat_id: true,
      user_id_admin: true,
      user_id_user: true,
      chat_user: {
        select: {
          name: true,
        },
      },
      create_at: true,
    },
    where: {
      user_id_admin: user_id,
    },
  });
  console.log("chats: ", chats);
  return res.status(200).json({
    chats: chats,
  });
};

// const createChat = async (req: Request, res: Response) => {
//   // this application only create chat for user (admin is ignore)
//   const { userId } = req.query as { userId: string };
//         },
//       },
//     },
//     where: {
//       userIdFrom: userId,
//     },
//   });
//   return res.status(200).json({
//     chats: chats,
//   });
// };

// const createChat = async (req: Request, res: Response) => {
//   // this application only create chat for user (admin is ignore)
//   const { userId } = req.query as { userId: string };
//   //   const existsAdmin = await prisma.user.findFirst({
//   //     where: {
//   //       id: "4424ad66-3ab3-4b18-992a-b98ab5c7352f",
//   //     },
//   //   });
//   console.log("chat/createChat: ", userId);
//   const existsUser = await prisma.user.findFirst({
//     where: {
//       user_id: userId,
//     },
//   });
//   if (!existsUser)
//     return res.status(404).json({ Message: "Failed to create chat" });
//   //create Chat in user
//   const chat = await prisma.chat.create({
//     data: {},
//   });
//   const adminUser = await prisma.user.findFirst({
//     where: {
//       role: {
//         role_name: 'admin'
//       },
//     },
//   });
//   if (!adminUser) return res.status(500).json({ Message: "Admin not found." });
//   //create Chat in admin
//   await prisma.chat_User.create({
//     data: {
//       chatId: chat.chatId,
//       //user
//       userIdFrom: userId,
//       //admin
//       userIdTo: adminUser.user_id,
//     },
//   });

//   await prisma.chat_User.create({
//     data: {
//       //admin
//       userIdTo: userId,
//       userIdFrom: adminUser.user_id,
//       chatId: chat.chatId,
//     },
//   });
//   return res.status(201).json({ Message: "" });
// };

const getAllMessageFromChatId= async (req:Request,res:Response)=>{
  const {chat_id} = req.query as {chat_id:string};
  if(!chat_id || chat_id === ""){
    return res.status(400).json({Message: "Không tìm thấy chat này"});
  }
  const messages = await prisma.chat_Message.findMany({
    select:{
      message_id: true,
      create_at: true,
      content:true,
      user_id: true
    },
    orderBy: {
      create_at: "asc"
    },
    where:{
      chat_id: chat_id
    }
  });
  const format_message= messages.map(item=>({
    ...item,message: item.content
  }));
  return res.status(200).json({messages:format_message});
}

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
  if (!exists) return res.status(404).json({ Message: "Không tìm thấy user" });
  await prisma.chat_Message.create({
    data: {
      chat_id: chatId,
      user_id: userId,
      content: content,
    },
  });
};

const getAllMessageFromChat = async (req: Request, res: Response) => {
  const { chat_id } = req.query as { chat_id: string };
  if (chat_id === "default")
    return res.status(400).json({ Message: "Failed to get message" });
  const exists = await prisma.chat.findFirst({
    where: {
      chat_id: chat_id,
    },
  });
  if (!exists) return res.status(404).json({ Message: "Chat Not Found" });
  const allMessage = await prisma.chat_Message.findMany({
    select: {
      chat_id: true,
      content: true,
      user_id: true,
      message_id: true,
    },
    where: {
      chat_id: chat_id,
    },
  });
  return res.status(200).json({ messages: allMessage });
};

const getAllProductInChat = async ()=>{
  const products = await prisma.product.findMany({
    select:{
      product_id: true,
      product_name: true,
      price: true,
      description:true,
      imageUrl:true,
      product_size:true,
      product_color:true,
      inventories:{
        select:{
          color:{
            select:{
              color_id: true,
              color_name: true,
            }
          },
          size_id:true,
          quantity:true
        }
      },
      Product_Category:{
        select:{
          category:{
            select:{
              category_name:true
            }
          }
        }
      }
    },
    take: 5
  });
  const format_products=products.map(item=>({
    ...item,
    price: Number(item.price),
    imageUrl: item.imageUrl[0]
  }));
  return format_products;
}

const responseAI = async (message: string) => {
  const tools = [
    {
      type: "function",
      function: {
        name: "getAllProduct",
        description: "Lấy danh sách sản phẩm từ cơ sở dữ liệu",
        parameters: {
          type: "object",
          properties: {
            operation: {
              type: "string",
              enum: ["getAllProduct"],
            },
          },
          required: ["operation"],
        },
      },
    },
  ];
  
  try {
    const response = await puter.ai.chat(`Bạn là nhân viên tư vấn cho 
      shop quần ào "Forever." khi admin vắng mặt, 
      chỉ thực hiện các tools được cung cấp (dịch ra ngôn ngữ tự nhiên các tools)
      khi người dùng yêu cầu !
      , tin nhắn của người dùng:\n ${message}`,
      {tools});
    console.log("response: ",response);
  if(response.message?.tool_calls){
    const call = response.message.tool_calls[0];
    const args = JSON.parse(call?.function.arguments || "");
    let data:any = null;
    //@ts-ignore
    if(call?.function.name == "getAllProduct"){
      data = await getAllProductInChat();
    }
    // phải stringify data để tránh xử ra [Object object] !!
    const dataForAI = data ? JSON.stringify(data) : "Không có dữ liệu" ;
    console.log("data: ",dataForAI);
    const finalResponse = await puter.ai.chat(`
      Bạn là nhân viên tư vấn cho cửa hàng bán quần áo "Forever." 
        thay cho sự vắng mặt của admin. Nhiệm vụ là phản hồi thông tin sau 
        ở dạng html bắt đầu bằng <div> (style tailwindss, hình ảnh phải có class 'w-32 h-auto rounded', 
        sản phẩm thì phải có thẻ <a> kèm link "/Collection/product_id" sau nếu có).
        Dữ liệu từ hệ thống:${dataForAI}  
      `)
    return finalResponse.message?.content;
  }else{
    return response.message?.content;
  }
  } catch (error) {
    console.error("Chi tiết lỗi:", JSON.stringify(error, null, 2));
    return "Lỗi hệ thống !! \n Error: "+ JSON.stringify(error, null, 2);
  }
};

 const saveMessage = async(message:string,chat_id:string,user_id:string)=>{
  if(message==="" || chat_id==="" || user_id==="" || !chat_id || !user_id ){
    return "Tin nhắn không được để trống";
  }
  await prisma.chat_Message.create({
    data:{
      content: message,
      chat_id: chat_id,
      user_id: user_id
    },
  })
}

export {
  // createChat,
  saveMessage,
  responseAI,
  createMessage,
  getChatByUserId,
  getAllMessageFromChat,
  getChatByUserAdmin,
getAllMessageFromChatId
};
