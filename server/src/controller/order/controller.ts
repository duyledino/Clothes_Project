import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

//move all type to type.ts 
interface details {
  product_id: string;
  count: number;
  price: number;
  size_id: string;
  color_id: string;
}

const prisma = new PrismaClient();

const getAllOrder = async (req: Request, res: Response) => {
  const { page } = req.query;
  const orders = await prisma.order.findMany({
    select: {
      user_create: {
        select: {
          user_id: true,
          email: true,
          name: true,
        },
      },
      order_detail: {
        select: {
          product: {
            select: {
              product_name: true,
            },
          },
          size: true,
          color: true,
          quantity: true,
          price: true,
        },
      },
      order_id: true,
      status: true,
      total: true,
      payment: true,
      create_at: true,
      update_at: true,
    },
    take: Number(page) * 8,
  });
  const fixBigInt = orders.map((item) => ({
    ...item,
    total: Number(item.total),
  }));
  return res.status(200).json({ orders: fixBigInt });
};
// client will send array of detail then server will create each detail in array then create a order
// details: [
//   {
//     productId,
//     count,
//     subTotal,
//      size
//   },
// ];
const createAOrder = async (req: Request, res: Response) => {
  //get user id and details[]
  const { user_id, details, cart_id } = req.body as {
    cart_id: string;
    user_id: string;
    details: details[];
  };
  console.log("userId, details: ", user_id, details);
  if (!details || details.length === 0)
    return res.status(400).json({ Message: "Failed to create order" });
  const total = details.reduce((pre, curr) => pre + curr.price, 0);
  const existsUser = await prisma.user.findFirst({
    where: {
      user_id: user_id,
    },
  });
  if (!existsUser || existsUser.address === "")
    return res
      .status(400)
      .json({ Message: "Failed to Purchase (Hãy hoàn thành profile của bạn)" });
  if (!Array.isArray(details) || details.length <= 0)
    return res.status(400).json({ Message: "Failed to Purchase" });
  const orderCreated = await prisma.order.create({
    data: {
      user_id: user_id,
      total,
    },
  });
  const detail = details.map((item) => ({
    order_id: orderCreated.order_id,
    product_id: item.product_id,
    quantity: item.count,
    price: item.price,
    size_id: item.size_id,
    color_id: item.color_id,
  }));
  await prisma.order_Detail.createMany({
    data: detail,
  });
  for (let i = 0; i < detail.length; i++) {
    //check null
    if (!detail[i])
      return res.status(400).json({ Message: "Failed to create order" });
    await prisma.$queryRaw`update "Product" set count=count + ${
      detail[i]!.quantity
    } where product_id = ${detail[i]!.product_id}`;
  }
  await prisma.cart_Detail.deleteMany({
    where: {
      cart_id: cart_id,
      active: true,
    },
  });
  return res
    .status(200)
    .json({ Message: "Create order successfully", orderId: orderCreated.order_id });
};

// {
//     id
//     status,
//     payment
// }
// order's payemnt can be edit by admin or user's payement
// this controller aims to update payment status and order status
const updateAOrder = async (req: Request, res: Response) => {
  // get order id and payment: string, status: string
  let { payment, status } = req.body as { payment: string; status: string };
  const { order_id } = req.query as { order_id: string };
  payment = payment === "" ? "pending" : payment; // done
  status = status === "" ? "pending" : status; //pending, canceled , shipping, done
  const exist = await prisma.order.findFirst({
    where: {
      order_id: order_id,
    },
  });
  console.log("order_id: ", order_id);
  console.log("exists: ", exist);
  if (!exist) return res.status(400).json({ Message: "Failed to upate order" });
  await prisma.order.update({
    data: {
      payment,
      status,
    },
    where: {
      order_id:order_id,
    },
  });
  return res.status(200).json({ Message: "Update order successfully" });
};

const getTotalPage = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    select: {
      order_id: true,
    },
  });
  const total = orders.length;
  console.log("total: ", total);
  //get 8 order per page
  return res.status(200).json({ total: Number(Math.ceil(Number(total) / 8)) });
};

const getOrdersById = async (req: Request, res: Response) => {
  //get user id
  const { user_id } = req.query as { user_id: string };
  console.log("id: ", user_id);
  // Sample:
  // id="456"
  //           userId="123"
  //           total={100}
  //           date="2023-10-26"
  //           status="Shipped"
  //           payment="Done"
  //           details={[{ productId: "789", count: 1, subtotal: 100 }]}
  const orders = await prisma.order.findMany({
    select: {
      order_id: true,
      user_create: {
        select: {
          user_id: true,
          email: true,
          name: true,
          address: true,
        },
      },
      order_detail: {
        select: {
          quantity: true,
          product_id: true,
          price: true,
          size: true,
          color:true
        },
      },
      user_ship:{
        select:{
          user_id:true,
          name: true
        }
      },
      total: true,
      status: true,
      payment: true,
      create_at:true,
      update_at: true,
    },
    where: {
      user_id: user_id,
    },
  });
  const fixBigIntDetail = orders.map((item) => ({
    ...item,
    details: item.order_detail.map((child) => ({
      ...child,
      subtotal: Number(Number(child.price) * child.quantity),
    })),
  }));
  const fixBigInt = fixBigIntDetail.map((item) => ({
    ...item,
    total: Number(item.total),
  }));
  return res.status(200).json({ orders: fixBigInt });
};

export { createAOrder, updateAOrder, getAllOrder, getTotalPage, getOrdersById };
