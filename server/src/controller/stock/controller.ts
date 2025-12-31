import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllStockReceipt = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const stockReceipts = await prisma.stock_Receipt.findMany({
    select: {
      receipt_id: true,
      create_at: true,
      providers: {
        select:{
          provider_id:true,
          provider_name:true,
        }
      },
      user: {
        select:{
          user_id:true,
          name:true,
        }
      },
      stock_receipt_detail:{
        select:{
          inventory_id:true,
          quantity:true,
          size_id:true,
          color_id:true,
          product:{
            select:{
              product_id:true,
              product_name:true,
            }
          }
        }
      }
    },
    take: 10,
    skip: (page - 1) * 10,
  });
  const total_page = Math.ceil(
    (await prisma.stock_Receipt.findMany()).length / 10
  );
  const format_stockReceipts = stockReceipts.map((stockReceipt) => ({
    receipt_id: stockReceipt.receipt_id,
    create_at: stockReceipt.create_at,
    provider: stockReceipt.providers,
    user: stockReceipt.user,
    total_quantity: stockReceipt.stock_receipt_detail.reduce(
      (total, item) => total + item.quantity,
      0
    ),
    stock_receipt_details: stockReceipt.stock_receipt_detail.map((item) => ({
      inventory_id: item.inventory_id,
      quantity: item.quantity,
      size_id: item.size_id,
      color_id: item.color_id,
      product_name: item.product.product_name,
      product_id: item.product.product_id,
    })),
  }));
  return res.status(200).json({
    stockReceipts: format_stockReceipts,
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
      quantity_add: number;
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
    quantity: item.quantity_add,
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
            increment: item.quantity_add,
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

const getStockReceiptByReceiptId = async (req: Request, res: Response)=>{
  const { receipt_id } = req.query as {receipt_id: string};
  const exists_stock_receipt = await prisma.stock_Receipt.findFirst({
    select: {
      receipt_id: true,
    },
    where: {
      receipt_id: receipt_id,
    },
  });
  if(!exists_stock_receipt){
    return res.status(404).json({ Message: "Không tìm thấy phiếu nhập này" });
  }
  const stock_receipt = await prisma.stock_Receipt.findFirst({
    select: {
      receipt_id: true,
      create_at: true,
      providers: {
        select:{
          provider_id:true,
          provider_name:true,
        }
      },
      user: {
        select:{
          user_id:true,
          name:true,
        }
      },
      stock_receipt_detail:{
        select:{
          inventory_id:true,
          quantity:true,
          size_id:true,
          color_id:true,
          product:{
            select:{
              product_id:true,
              product_name:true,
            }
          }
        }
      }
    },
    where: {
      receipt_id: receipt_id,
    },
  });
  const format_stockReceipt = 
  {
receipt_id: stock_receipt?.receipt_id,
create_at: stock_receipt?.create_at,
provider: stock_receipt?.providers,
user: stock_receipt?.user,
total_quantity: stock_receipt?.stock_receipt_detail.reduce(
      (total, item) => total + item.quantity,
      0
    ),
    stock_receipt_details: stock_receipt?.stock_receipt_detail.map((item) => ({
      inventory_id: item.inventory_id,
      quantity: item.quantity,
      size_id: item.size_id,
      color_id: item.color_id,
      product_name: item.product.product_name,
      product_id: item.product.product_id,
    })),
  };
  console.log("format_stockReceipt: ",format_stockReceipt);
  return res.status(200).json({
    stockReceipt: format_stockReceipt,
  });
}

export { getAllStockReceipt, createStockReceipt, getPrepareBeforeAdd, getStockReceiptByReceiptId };
