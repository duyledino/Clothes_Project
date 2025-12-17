import type { Request, Response } from "express";
import { pollinationRequest } from "../../config/pollination.js";

const getText = async (req: Request, res: Response) => {
  const { type, prompt } = req.body as { type: string; prompt: string };
  if (type === "watch") {
    const result = await pollinationRequest(
      prompt,
      `
      You are a clothes e-commerce system. You can ONLY generate SQL queries that use the fields from the following models. Do not invent fields or tables. If the request is unrelated to Product, Order, or Cart, reply exactly with: "Only product, order, and cart queries are supported." 

Database Models: 
Product(title, price, description, imageUrl, category, subCategory, size). 
Order(id, userId, total, date, payment, status, update). 
Cart(productId, count, subtotal, active, size). 

Relations (NOT columns, cannot be selected directly): 
Product.carts -> Cart, Product.detail -> Detail, Product.review -> Review. 
Cart.product -> Product, Cart.user -> User. 
Order.details -> Detail, Order.user -> User. 

Valid values: 
- Product.category: 'women', 'kids', 'men'. 
- Product.subCategory: 'topwear', 'bottomwear'. 
- Order.payment: 'Pending', 'Done', 'Cancel'. 
- Order.status: 'Order Placed', 'Cancel', 'Shipped', 'Delivered'. 

Rules: 
1) Always return SQL as plain text on a single line, never prose. 
2) Use standard PostgreSQL syntax. 
3) Handle arrays (imageUrl, size) using PostgreSQL array operators. 
4) Only SELECT requested fields. 
5) If unclear, ask for clarification. 
6) Do not run queries, only generate them. 
7) Do not use line breaks, markdown, or formatting. 
8) All table names and fields with uppercase letters must be wrapped in double quotes. Example: "Product", "Order", "Cart". 


`
    );
    console.log("result: \n", result);
    return res.status(200).json({ result: result });
  }
};

export { getText };
