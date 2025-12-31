import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllCategory = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    select: {
      category_id: true,
      category_name: true,
      _count: {
        select: { product: true }, // Đếm số lượng quan hệ 'product'
      },
    },
  });
  const format_categories = categories.map((item) => ({
    category_id: item.category_id,
    category_name: item.category_name,
    link_total: item._count.product,
  }));
  console.log("categories: ", categories);
  console.log("format_categories: ", format_categories);

  return res.status(200).json({
    categories: format_categories,
  });
};

const createACategory = async (req: Request, res: Response) => {
  const { category_name } = req.body as { category_name: string };

  if (!category_name) {
    return res.status(404).json({ Message: "Thiếu tên phân loại" });
  }
  const newCategory = await prisma.category.create({
    data: {
      category_name,
    },
  });

  return res.status(201).json({
    Message: "Category created successfully",
    newCategory: newCategory,
  });
};

const getACategory = async (req: Request, res: Response) => {
  const { category_id } = req.query as { category_id: string };

  if (!category_id) {
    return res.status(404).json({ Message: "Thiếu mã phân loại" });
  }

  const category = await prisma.category.findFirst({
    where: {
      category_id: category_id,
    },
  });

  if (!category) {
    return res.status(404).json({ Message: "Không tìm thấy role" });
  }

  return res.status(200).json({
    category: category,
  });
};

const updateACategory = async (req: Request, res: Response) => {
  const { category_id, category_name } = req.body as {
    category_id: string;
    category_name: string;
  };

  if (!category_id || !category_name) {
    return res.status(404).json({ Message: "Thiếu mã hoặc tên phân loại" });
  }

  const existing = await prisma.category.findFirst({
    where: { category_id },
  });

  if (!existing) {
    return res.status(404).json({ Message: "Không tìm thấy role" });
  }

  const updatedCategory = await prisma.category.update({
    where: {
      category_id: category_id,
    },
    data: {
      category_name: category_name,
    },
  });

  return res.status(200).json({
    Message: "Category updated successfully",
    updatedCategory: updatedCategory,
  });
};

const deleteACategory = async (req: Request, res: Response) => {
  const { category_id } = req.query as {
    category_id: string;
  };

  const exists = await prisma.category.findFirst({
    select: {
      category_id: true,
      category_name: true,
    },
    where: {
      category_id: category_id,
    },
  });

  if (!exists) {
    return res.status(404).json({ Message: "Không tìm thấy phân loại này" });
  }

  const existsProductInCategory = await prisma.product.findFirst({
    select: {
      product_name: true,
    },
    where: {
      category_id: category_id,
    },
  });

  if (existsProductInCategory) {
    return res.status(400).json({
      Message: `Không thể xóa: phân loại '${exists.category_name}' vẫn còn chứa sản phẩm (VD: ${existsProductInCategory.product_name})`,
    });
  }

  const categoryDel = await prisma.category.delete({
    select: {
      category_id: true,
      category_name: true,
    },
    where: {
      category_id: category_id,
    },
  });

  return res.status(200).json({
    Message: "Đã xóa phân loại thành công: " + categoryDel.category_name,
    Data: categoryDel.category_id,
  });
};

export { getAllCategory, createACategory,deleteACategory, getACategory, updateACategory };
