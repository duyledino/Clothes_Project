import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllInventory = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const inventories = await prisma.inventory.findMany({
    select: {
      product: {
        select: {
          category: true,
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
  const total_page = Math.ceil((await prisma.inventory.findMany()).length / 15);
  const format_inventories = inventories.map((item) => ({
    ...item,
    product: {
      category: item.product.category,
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

export { getAllInventory, getInventoryBySearchingNameOrId };
