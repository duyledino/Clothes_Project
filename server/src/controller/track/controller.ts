import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getRevenue = async (req: Request, res: Response) => {
  const getTotal:any[] = await prisma.$queryRaw`SELECT 
  EXTRACT(MONTH FROM update_at) AS month,
  EXTRACT(YEAR FROM update_at) AS year,
  SUM(total) AS total
FROM "Order"
WHERE payment = 'done' and status = 'done'
GROUP BY month, year
ORDER BY year DESC, month DESC
LIMIT 3;
`;
  const fixGetTotal = getTotal.map((row) => ({
    month: row.month, //number
    year: row.year, ////number
    total: Number(row.total),
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
