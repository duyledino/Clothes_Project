import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import type { details } from "../../types/types.backend.js";
import { chdir } from "node:process";

//move all type to type.ts

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
          address: true,
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
      method: true,
    },
    take: Number(page) * 8,
  });
  const fixBigInt = orders.map((item) => ({
    ...item,
    order_detail: item.order_detail.map((child) => ({
      product_name: child.product.product_name,
      product_size: child.size,
      product_color: child.color,
      quantity: child.quantity,
      price: Number(child.price),
    })),
    total: Number(item.total),
  }));
  console.log("fixBigInt: ", fixBigInt);
  console.log("fixBigInt: ", fixBigInt[0]?.order_detail);
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
  const total = details.reduce((pre, curr) => pre + curr.subtotal, 0);
  console.log("total: ", total);
  const existsUser = await prisma.user.findFirst({
    where: {
      user_id: user_id,
    },
  });
  if (!existsUser || existsUser.address === "")
    return res.status(400).json({
      Message:
        "Failed to Purchase (Hãy hoàn thành profile của bạn: thiếu địa chỉ)",
    });
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
    subtotal: item.subtotal,
    price: item.subtotal / item.count,
    size_id: item.product_size.size_id,
    color_id: item.product_color.color_id,
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
  return res.status(200).json({
    Message: "Create order successfully",
    order_id: orderCreated.order_id,
  });
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
  let { payment, status, shipper_id } = req.body as {
    payment: string;
    status: string;
    shipper_id: string;
  };
  const { order_id } = req.query as { order_id: string };
  //NOTE:
  // user choose COD => payment: pending, status: pending
  // user choose online payment (OP) => payment: done, status: pending
  // admin update order status (COD), shipper is shippping the order
  // => payment: pending, status: shipping
  // admin update order status (OP), shipper is shippping the order
  // => payment: done, status: shipping
  // admin update order status (OP), shipper is shippping the order
  // => payment: done, status: shipping
  // admin / shipper finish their shipment=> update order status (COD,OP), shipper is shippping the order
  // => payment: done, status: done
  payment = payment === "" ? "pending" : payment; // done, canceled
  status = status === "" ? "pending" : status; //pending, canceled , shipping, done
  const exist = await prisma.order.findFirst({
    where: {
      order_id: order_id,
    },
  });
  console.log("order_id: ", order_id);
  console.log("exists: ", exist);
  if (!exist)
    return res.status(400).json({ Message: "Đơn hàng không tồn tại" });
  if (shipper_id !== null || shipper_id !== undefined) {
    const exist_shipper = await prisma.user.findFirst({
      where: {
        user_id: shipper_id,
      },
    });
    if (!exist_shipper) {
      return res.status(404).json({ Message: "Không tìm thấy shipper này" });
    }
    await prisma.order.update({
      data: {
        payment,
        status,
        shipper_id: shipper_id,
      },
      where: {
        order_id: order_id,
      },
    });
  } else {
    await prisma.order.update({
      data: {
        payment,
        status,
      },
      where: {
        order_id: order_id,
      },
    });
  }
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

const getOrderByUserId = async (req: Request, res: Response) => {
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
      method: true,
      user_create: {
        select: {
          name: true,
          address: true,
        },
      },
      order_detail: {
        select: {
          quantity: true,
          product_id: true,
          product: {
            select: {
              product_name: true,
            },
          },
          price: true,
          size: {
            select: {
              size_id: true,
            },
          },
          color: {
            select: {
              color_id: true,
            },
          },
        },
      },
      user_ship: {
        select: {
          email: true,
          user_id: true,
          name: true,
        },
      },
      total: true,
      status: true,
      payment: true,
      create_at: true,
      update_at: true,
    },
    where: {
      user_id: user_id,
    },
  });
  // console.log("order.order_detail: ",orders[1]?.order_detail)
  const fixBigIntDetail = orders.map((item) => ({
    ...item,
    total: Number(item.total),
    order_detail: item.order_detail.map((child) => ({
      ...child,
      price: Number(child.price),
      subtotal: Number(Number(child.price) * child.quantity),
    })),
  }));
  const finalOrders = fixBigIntDetail.map((item) => ({
    ...item,
    order_detail: item.order_detail.map((child) => ({
      product_id: child.product_id,
      product_name: child.product.product_name,
      price: child.price,
      quantity: child.quantity,
      product_size: child.size,
      product_color: child.color,
      subtotal: child.subtotal,
    })),
  }));
  console.log(
    "fixBigIntDetail: ",
    fixBigIntDetail,
    "order detail[0]",
    fixBigIntDetail[0]?.order_detail
  );

  return res.status(200).json({ orders: finalOrders });
};

const getOrderByOrderId = async (req: Request, res: Response) => {
  const { order_id } = req.query as { order_id: string };
  console.log("order_id: ", order_id);
  const exist = await prisma.order.findFirst({
    select: {
      order_id: true,
    },
    where: {
      order_id: order_id,
    },
});
  if (order_id == "" || exist === null) {
    return res.status(404).json({ Message: "Không tìm thấy đơn hàng này" });
  }
  const order = await prisma.order.findFirst({
    select: {
      order_id: true,
      user_create: {
        select: {
          name: true,
          address: true,
          email: true,
        },
      },
      user_ship: {
        select: {
          user_id: true,
          name: true,
        },
      },
      method: true,
      create_at: true,
      update_at: true,
      status: true,
      payment: true,
      delivered_date: true,
      total: true,
      order_detail: {
        select: {
          color_id: true,
          size_id: true,
          quantity: true,
          price: true,
          product: {
            select: {
              imageUrl: true,
              product_id: true,
              product_name: true,
            },
          },
        },
      },
    },
    where: {
      order_id: order_id,
    },
  });
  const format_order = {
    order_id: order?.order_id,
    user_create: order?.user_create,
    user_ship: order?.user_ship,
    method: order?.method,
    create_at: order?.create_at,
    update_at: order?.update_at,
    status: order?.status,
    payment: order?.payment,
    delivered_date: order?.delivered_date,
    total: Number(order?.total),
    order_detail: order?.order_detail.map((item) => ({
      quantity: item.quantity,
      imageUrl: item.product.imageUrl[0],
      subtotal: item.quantity * Number(item.price),
      product_id: item.product.product_id,
      product_name: item.product.product_name,
      product_size: {
        size_id: item.size_id,
        product_id: item.product.product_id,
      },
      product_color: {
        product_id: item.product.product_id,
        color_id: item.color_id,
      },
    })),
  };
  console.log("format_order: ", format_order);
  return res.status(200).json({ order: format_order });
};

export {
  getOrderByOrderId,
  createAOrder,
  updateAOrder,
  getAllOrder,
  getTotalPage,
  getOrderByUserId,
};
