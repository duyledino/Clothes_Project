import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllInventory = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const inventoriest = await prisma.inventory.findMany({
    include: {
      product: true,
      color: true,
      size: true,
    },
    take: page * 15,
    skip: (page - 1) * 15,
  });
  const total_page = Math.ceil((await prisma.inventory.findMany()).length / 15);
  return res.status(200).json({
    inventoriest: inventoriest,
    total_page: total_page,
  });
};

export { getAllInventory };
