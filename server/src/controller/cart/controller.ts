import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getCart = async (req: Request, res: Response) => {
  // get user id
  const { user_id } = req.query as { user_id: string };
  const exists = await prisma.user.findFirst({
    where: {
      user_id: user_id,
    },
  });
  if (!exists) return res.status(404).json({ Message: "User not found" });
  const cart = await prisma.cart.findFirst({
    select: {
      cart_id: true,
    },
    where:{
      user_id: user_id
    }
  });
  const carts = await prisma.cart_Detail.findMany({
    select: {
      quantity: true,
      product: {
        select: {
          product_id: true,
          price: true,
          imageUrl: true,
          product_name: true,
        },
      },
      active: true,
      size: true,
      color: true,
    },
    where: {
      cart_id: cart?.cart_id ?? "",
    },
  });
  const finalCart = carts.map((item) => {
    const price = Number(item.product.price);
    const subtotal = item.quantity * price;

    return {
      product: { 
        ...item.product, 
        price: price 
      },

      product_size: item.size, 
      product_color: item.color,

      active: item.active,
      quantity: item.quantity,
      
      subtotal: subtotal 
    };
  });
  console.log("fixBigIntCart: ",finalCart);
  return res.status(200).json({ carts: finalCart });
};
const addToCart = async (req: Request, res: Response) => {
  // get user id and 1 add from client
  // if exists will update "count" else add new row
  const { user_id } = req.query as { user_id: string };
  //     cartItem:  {
  // product product
  // count     Int     @default(0)
  // subtotal  BigInt  @default(0)
  //active @default(false)
  // size_id string
  // color_id
  //     }
  const { cartItem } = req.body;
  const exists = await prisma.user.findFirst({
    where: {
      user_id: user_id,
    },
  });
  if (!exists) return res.status(404).json({ Message: "User not found" });
  // get exists cart
  const cart = await prisma.cart.findFirst({
    select: {
      cart_id: true,
    },
  });
  console.log("cart: ",cart);
  console.log("add to cart: ", cartItem);

  if(!cart){
    return res.status(400).json({Message: "User lỗi (chưa có cart)"});
  }
  const existsItem = await prisma.cart_Detail.findFirst({
    where: {
      cart_id: cart.cart_id,
      product_id: cartItem.product.product_id,
      size_id: cartItem.product_size.size_id,
      color_id: cartItem.product_color.color_id,
    },
  });
  if (!existsItem) {
    await prisma.cart_Detail.create({
      data: {
        cart_id: cart?.cart_id!,
        quantity: cartItem.quantity,
        product_id: cartItem.product.product_id,
        active: cartItem.active,
        size_id: cartItem.product.product_size.size_id,
        color_id: cartItem.product.product_color.color_id
      },
    });
  } else {
    await prisma.cart_Detail.update({
      data: {
        quantity: cartItem.quantity,
        active: cartItem.active,
      },
      where: {
        cart_id_color_id_product_id_size_id: {
          cart_id: existsItem.cart_id,
          product_id: existsItem.product_id,
          size_id: existsItem.size_id,
          color_id: existsItem.color_id,
        },
      },
    });
  }
  return res.status(200).json({ Message: "update cart successfully" });
};
// this route will clear all item in cart
const clearCart = async (req: Request, res: Response) => {
  // get user id
  const { user_id } = req.query as { user_id: string };
  const exists = await prisma.user.findFirst({
    where: {
      user_id,
    },
  });
  if (!exists) return res.status(404).json({ Message: "User not found" });
  const cart = await prisma.cart.findFirst({
    select: {
      cart_id: true,
    },
  });
  await prisma.cart_Detail.deleteMany({
    where: {
      cart_id: cart?.cart_id!,
    },
  });
  return res.status(200).json({ Message: "Cart is cleared" });
};
// this route will remove an item in cart
const removeAnItem = async (req: Request, res: Response) => {
  // get user_id, get product_id, size_id and color_id
  const { user_id, product_id, size_id,color_id } = req.query as {
    user_id: string,
    product_id: string,
    size_id: string,
    color_id:string
  };
  const exists = await prisma.user.findFirst({
    where: {
      user_id: user_id,
    },
  });
  if (!exists) return res.status(404).json({ Message: "User not found" });
  const cart = await prisma.cart.findFirst({
    select: {
      cart_id: true,
    },
  });
  await prisma.cart_Detail.delete({
    where: {
      cart_id_color_id_product_id_size_id: {
        cart_id: cart?.cart_id!,
        color_id: color_id,
        size_id:size_id,
        product_id: product_id
      },
    },
  });
  return res.status(200).json({ Message: "Item is removed" });
};

export { addToCart, clearCart, getCart, removeAnItem };
