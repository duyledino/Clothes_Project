import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllStockReceipt = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const stockReceipts = await prisma.stock_Receipt.findMany({
    include: {
      providers: true,
      user: true,
    },
  });
  const total_page = Math.ceil(
    (await prisma.stock_Receipt.findMany()).length / 15
  );
  return res.status(200).json({
    stockReceipts: stockReceipts,
    total_page: total_page,
  });
};

const getPrepareBeforeAdd = async (req: Request, res: Response) => {
  const inventorys = await prisma.inventory.findMany({
    select: {
      color: true,
      size: true,
      product: true,
      quantity: true,
    },
  });
  return res.status(200).json({
    success: true,
    inventorys: inventorys,
  });
};

//client checks errors !!
//inventory is also loaded on client
const createStockReceipt = async (req: Request, res: Response) => {
  const { provider_id, stock_receipt_detail, user_id } = req.body as {
    provider_id: string;
    user_id: string;
    stock_receipt_detail: {
      inventory_id: string;
      product_id: string;
      size_id: string;
      color_id: string;
      quantity: number;
    }[];
  };
  console.log(
    "provider_id, stock_receipt_detail, user_id:",
    provider_id,
    stock_receipt_detail,
    user_id
  );
  const exists_user = await prisma.user.findFirst({
    select: {
      user_id: true,
    },
    where: {
      user_id: user_id,
    },
  });
  if (!exists_user) {
    return res.status(404).json({ Message: "Không tìm thấy người này" });
  }
  const exists_provider = await prisma.provider.findFirst({
    select: {
      provider_id: true,
    },
    where: {
      provider_id: provider_id,
    },
  });
  if (!exists_provider) {
    return res.status(404).json({ Message: "Không tìm thấy nhà cung cấp này" });
  }
  const stock_receipt = await prisma.stock_Receipt.create({
    data: {
      provider_id: provider_id,
      user_id: user_id,
    },
  });
  const data_save = stock_receipt_detail.map((item) => ({
    color_id: item.color_id,
    inventory_id: item.inventory_id,
    product_id: item.product_id,
    quantity: item.quantity,
    receipt_id: stock_receipt.receipt_id,
    size_id: item.size_id,
  }));
  await prisma.stock_Receipt_Detail.createMany({
    data: data_save,
  });
  stock_receipt_detail.forEach(
    async (item) =>
      await prisma.inventory.update({
        data: {
          quantity: {
            increment: item.quantity,
          },
        },
        where: {
          inventory_id_product_id_color_id_size_id: {
            color_id: item.color_id,
            inventory_id: item.inventory_id,
            product_id: item.product_id,
            size_id: item.size_id,
          },
        },
      })
  );
  return res.status(200).json({ Message: "Đã thêm phiếu nhập thành công" });
};

export { getAllStockReceipt, createStockReceipt, getPrepareBeforeAdd };
