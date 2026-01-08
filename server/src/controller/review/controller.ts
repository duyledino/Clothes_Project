import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

// 1. Get Reviews by Product
const getReviewByProduct = async (req: Request, res: Response) => {
  const { product_id } = req.query as { product_id: string };

  if (!product_id) {
    throw new Error("Product ID is required");
    // Or if you prefer your manual 400 response:
    // return res.status(400).json({ Message: "Product ID is required" });
  }

  const reviews = await prisma.review.findMany({
    where: {
      product_id: product_id,
    },
    include: {
      user: true, 
    },
  });

  return res.status(200).json(reviews);
};

const createAReviewByUser = async (req: Request, res: Response) => {
  const { product_id, score, content } = req.body as {
    product_id: string;
    score: string;
    content: string;
  };
  const { user_id } = req.query as { user_id: string };
  
  console.log("create review ✅");

  if (!product_id || !user_id || !score) {
    return res
      .status(400)
      .json({ Message: "Thiếu thông tin" });
  }

  const review = await prisma.review.create({
    data: {
      content: content,
      product_id: product_id,
      user_id: user_id,
      score: parseInt(score),
    },
  });

  return res.status(201).json({Message:"Thêm review thành công"});
};

// 3. Update Review
const updateAReviewByUser = async (req: Request, res: Response) => {
  const { product_id, user_id } = req.query as {
    product_id: string;
    user_id: string;
  };
  const { score, content } = req.body;
  
  console.log("update review ✅ ");

  if (!product_id || !user_id || !score) {
    return res
      .status(400)
      .json({ Message: "Thiếu thông tin" });
  }

  const review = await prisma.review.update({
    where: {
      product_id_user_id: {
        product_id: product_id,
        user_id: user_id,
      },
    },
    data: {
      content: content,
      score: parseInt(score),
    },
  });

  return res.status(200).json({Message:"Cập nhật review thành công"});
};

// 4. Delete Review
const deleteAReviewByUser = async (req: Request, res: Response) => {
  const { product_id,user_id } = req.query as { product_id: string,user_id: string };
  console.log("delete review, product_id: ",product_id,"user_id: ",user_id);
  if (product_id === "" || user_id === "") {
    return res
      .status(400)
      .json({ Message: "Thiếu thông tin" });
  }

  await prisma.review.delete({
    where: {
      product_id_user_id: {
        product_id: product_id,
        user_id: user_id, 
      },
    },
  });

  return res.status(200).json({Message:"Xóa review thành công"}); 
};

export {
  getReviewByProduct,
  createAReviewByUser,
  updateAReviewByUser,
  deleteAReviewByUser,
};