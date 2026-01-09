import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getRevenue = async (req: Request, res: Response) => {
  const {filter} = req.query;
  if(!filter || filter== ""){
    return res.status(400).json({Message:"Chưa chọn filter"});
  }
  let getTotal:any[]=[];
  if(filter == "day"){
    getTotal = await prisma.$queryRaw`SELECT 
  TO_CHAR(update_at, 'YYYY-MM-DD') as label, 
  SUM(total) as value
FROM "Order"
WHERE payment = 'done' AND status = 'done'
  AND update_at >= NOW() - INTERVAL '7 days'
GROUP BY label
ORDER BY label ASC;`
  }else if(filter == "month"){
    getTotal = await prisma.$queryRaw`SELECT 
  TO_CHAR(DATE_TRUNC('month', update_at), 'YYYY-MM') as label, 
  SUM(total) as value
FROM "Order"
WHERE payment = 'done' AND status = 'done'
  AND update_at >= NOW() - INTERVAL '3 months'
GROUP BY label
ORDER BY label ASC;
`;
  }else if(filter == "week"){
    getTotal = await prisma.$queryRaw`SELECT 
  TO_CHAR(DATE_TRUNC('week', update_at), 'YYYY-MM') as label, 
  SUM(total) as value
FROM "Order"
WHERE payment = 'done' AND status = 'done'
  AND update_at >= NOW() - INTERVAL '3 weeks'
GROUP BY label
ORDER BY label ASC; 
`;
  }
  const fixGetTotal = getTotal.map((row) => ({
    label: row.label, //string
    value: Number(row.value),
  }));
  console.log('fixGetTotal: ',fixGetTotal);
  return res.status(200).json({
    revenue: fixGetTotal,
  });
};

const bestSeller = async (req:Request, res:Response) => {
  const best = await prisma.product.findMany({
    select: {
      product_id: true,
      price: true, // number
      count: true, //number
      product_name: true, //string
    },
    orderBy: {
      count: "desc",
    },
    // ensure column count > 0
    where: {
      count: {
        gt: 0,
      },
    },
    take: 3,
  });
  const fixGetPrice = best.map((row) => ({
    product_id: row.product_id,
    price: Number(row.price),
    count: Number(row.count),
    product_name: row.product_name,
  }));
  return res.status(200).json({ bestSeller: fixGetPrice });
};

const bestCustomer = async (req:Request, res:Response) => {
  const getTotal:any[] =
    await prisma.$queryRaw`select o.user_id as user_id,u."name",u.email,sum(o.total) as total
from "Order" o join "User" u on o."user_id" = u.user_id 
where o.payment = 'done'
group by o.user_id,u."name",u.email
order by total desc
limit 3
`;
  const fixGetTotal = getTotal.map((row) => ({
    user_id: row.user_id, //string
    name: row.name,
    email: row.email,
    total: Number(row.total), //number
  }));
  return res.status(200).json({ bestCustomer: fixGetTotal });
};

export { getRevenue, bestSeller, bestCustomer };
