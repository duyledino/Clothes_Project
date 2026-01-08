import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllInventory = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const inventories = await prisma.inventory.findMany({
    select: {
      product: {
        select: {
          Product_Category:{
            select:{
              category:true,
            }
          },
          imageUrl: true,
          product_name: true,

        },
      },
      product_id: true,
      create_at: true,
      color_id: true,
      size_id: true,
      inventory_id: true,
      min_quantity: true,
      update_at: true,
      quantity: true,
    },
    take: page * 15,
    skip: (page - 1) * 15,
    orderBy: {
      quantity: "asc",
    },
  });
  const number_of_row = await prisma.inventory.count();
  const total_page = Math.ceil(number_of_row / 15);
  console.log("number_of_row",number_of_row);
  console.log("total_page",total_page);
  const format_inventories = inventories.map((item) => ({
    ...item,
    product: {
      category: item.product.Product_Category.map((item) => item.category),
      imageUrl: item.product.imageUrl[0],
      product_name: item.product.product_name,
    },
  }));
  console.log("Format_in",format_inventories);
  return res.status(200).json({
    inventories: format_inventories,
    total_page: total_page,
  });
};



const getInventoryBySearchingNameOrId = async (req: Request, res: Response) => {
  const { query } = req.query as {
    query: string;
  };
  const inventories = await prisma.inventory.findMany({
    select: {
      color_id: true,
      inventory_id: true,
      min_quantity: true,
      quantity: true,
      product_id: true,
      size_id: true,
      product: {
        select: {
          product_name: true,
        },
      },
    },
    where: {
      OR: [
        {
          product_id: {
            startsWith: query.toLowerCase(),
            mode: "insensitive",
          },
        },
        {
          product: {
            product_name: {
              startsWith: query,
              mode: "insensitive",
            },
          },
        },
      ],
    },
  });
  return res.status(200).json({ inventories: inventories });
};


const getInventoryFollowingCart = async (req: Request, res: Response) => {
  const { user_id } = req.query as {
    user_id: string;
  };
  const cartItems = await prisma.cart.findFirst({
    select:{
      cart_detail:{
        select:{
          product_id:true,
          size_id:true,
          color_id:true,
          quantity:true
        }
      }
    },
    where: {
      user_id: user_id,
    },
  });
  if(cartItems!.cart_detail.length == 0){
    return res.status(200).json({ inventories: [] });
  }
  const inventories = await prisma.inventory.findMany({
    select: {
      color_id: true,
      inventory_id: true,
      quantity: true,
      product_id: true,
      size_id: true,
    },
    where: {
      AND:[
       {
        product_id:cartItems!.cart_detail.find((item)=>item.product_id)!.product_id,
       },
       {
        size_id:cartItems!.cart_detail.find((item)=>item.size_id)!.size_id,
       },
       {
        color_id:cartItems!.cart_detail.find((item)=>item.color_id)!.color_id,
       }
      ]
    },
  }); 
  console.log("inventories",inventories);
  return res.status(200).json({ inventories: inventories });
};

const updateNewMinQuantityInventory = async(req:Request,res:Response)=>{
  const {inventory_id,new_min_quantity} = req.body as {
    inventory_id:string;
    new_min_quantity:number;
  };
  const existsInventory = await prisma.inventory.findFirst({
    where:{
      inventory_id:inventory_id,
    }
  });
  if(!existsInventory){
    return res.status(400).json({Message:"Không tìm thấy tồn kho này"});
  }
  await prisma.inventory.update({
    where:{
      inventory_id:inventory_id,
    },
    data:{
      min_quantity:new_min_quantity,
    }
  });
  return res.status(200).json({Message:"Cập nhật thành công số lượng tối thiểu tồn kho"});
}

export { getAllInventory, getInventoryBySearchingNameOrId, getInventoryFollowingCart,
  updateNewMinQuantityInventory
 };
