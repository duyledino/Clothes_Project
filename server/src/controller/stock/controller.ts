import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllStockReceipt = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const stockReceipts = await prisma.stock_Receipt.findMany({
    include: {
      providers: true,
      users: true,
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

const getPrepareBeforeAdd=async(req:Request,res:Response)=>{
  const inventorys = await prisma.inventory.findMany({
    select:{
      color:true,
      size:true,
      product:true,
      quantity:true,
    }
  });
  return res.status(200).json({
    success:true,
    inventorys: inventorys
  })
}

//client checks errors !!
//inventory is also loaded on client
const createAStockReceipt = async(req:Request,res:Response)=>{
  //who create this, who send the stocks,
  const {user_id,provider_id,stock_receipt_detail} = req.body as {
    user_id:string,provider_id:string,
    stock_receipt_detail: {
      product_id:string,
      size_id:string,
      color_id:string,
      quantity:number,
      inventory_id:string
    }[]
  };
  const stock_receipt =  await prisma.stock_Receipt.create({
    data:{
      provider_id:provider_id,
      user_id:user_id,
    }
  });
  
  await prisma.stock_Receipt_Detail.createMany({
    data: stock_receipt_detail.map(item=>(
      {...item,...{receipt_id: stock_receipt.receipt_id,inventory_id: item.inventory_id}}
    ))
  });
  return res.status(200).json({
    success:true,
    Message: "Create stock receipt successfully"
  });
}

export {getAllStockReceipt,createAStockReceipt,getPrepareBeforeAdd}
